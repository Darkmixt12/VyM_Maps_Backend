import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserDetails } from './dto/userDetails.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name)
     private userModel: Model<User>,
     private jwtService : JwtService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try{

        const { password, ...userData} = createUserDto

        //! ENCRIPTAR LA CONTRASEÑA 

        const newUser = new this.userModel({
          password: bcryptjs.hashSync( password, 10 ),
          ...userData
        });

        await newUser.save()
        const { password:_, ...user } = newUser.toJSON(); // REGRESA EL USUARIO PERO SIN LA CONTRASEÑA
        return user;

    } catch (error){
        if( error.code === 11000 ) {
          throw new BadRequestException( `El correo ${ createUserDto.email } ya ha sido utilizado` )
        }
        throw new InternalServerErrorException('Algo terrible ha ocurrido!!')
    }

  }

  async register( registerDto: RegisterDto): Promise<LoginResponse>{

    const user =  await this.create(registerDto);
    console.log({user})

    return {
      user:user,
      token: this.getJWT( { id: user._id}),
    }
  }

  async login( loginDto: LoginDto ): Promise<LoginResponse>{
    console.log( loginDto)
    //! VERIFICACION DEL USUARIO contraseña y email

    const { email, password} = loginDto;

    const user = await this.userModel.findOne({email});
 
    if (!user){
      throw new UnauthorizedException('Credenciales no validas')
    }

    if(!bcryptjs.compareSync(password, user.password))
      throw new UnauthorizedException('Contraseña incorrecta')

    const { password:_, ...rest } = user.toJSON();

    //! GENERA EL TOKEN LA FUNCION
    return {
      user: rest,
      token: this.getJWT({ id: user.id})
    }
  }

  async changePassword( changePasswordDto : ChangePasswordDto){
    const { email, password, newPassword} = changePasswordDto;
    const userFinded = await this.userModel.findOne({email});

    if(!email) {
      throw new UnauthorizedException('Por favor desconectese y vuelva a intentarlo')
    }
    if(!bcryptjs.compareSync(password, userFinded.password))
      throw new UnauthorizedException('Contraseña incorrecta')
    
      const Encriptado = bcryptjs.hashSync( newPassword, 10 )
      const UpdatePassword : UpdateAuthDto = {
          password : Encriptado,
      }
     return this.userModel.findByIdAndUpdate(userFinded._id, UpdatePassword)
  }

  findAll(): Promise<User[]> {
    return this.userModel.find()
  }

  findOne(id: string) {

    return this.userModel.findById(id)
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWT( payload: JwtPayload){

    const token = this.jwtService.sign(payload)
    return token
  }

  async findUserById( userId: string){
    const user = await this.userModel.findById(userId);
    const { password, ...rest} = user.toJSON(); // se agregar el TOJSON  para evitar que mande los metodos tambien
    return rest;
  }
}
