import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserDetails } from './dto/userDetails.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {

    return this.authService.create(CreateUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {

    return this.authService.login( loginDto );
  }

  @Post('/updatedPassword')
  changePassword(@Body() changePasswordDto: ChangePasswordDto){

    return this.authService.changePassword(changePasswordDto)
  }
 

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {

    return this.authService.register( registerDto );
  }

  //! GENERAR NUEVO JW TOKEN //
  @UseGuards( AuthGuard)
  @Get( 'check-token' )
  checkToken( @Request() req: Request): LoginResponse {

    const user = req['user'] as User;
    return{
      user,
      token: this.authService.getJWT({id: user._id})
    }
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req: Request ) {
    const user = req['user'];

    // return user;
    return this.authService.findAll();
  }

  @Patch('/updateUser/:id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUser) {
    return this.authService.updateUser(id, updateUser);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
