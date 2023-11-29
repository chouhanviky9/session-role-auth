import * as mongoose from 'mongoose';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerInterceptor } from './common/interceptors/error-handler.interceptor';
import { RolesGuard } from './common/gaurds/role.gaurd';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
@Module({
  imports: [
    AuthModule, UserModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = process.env.MONGO_DB_URI;
        await mongoose.connect(uri);
        console.log(`Connected to MongoDB at ${uri}`);
        return { uri }; 
      },
    }),
    RateLimiterModule.register({ 
      points: 5, 
      duration: 1,  
     }),
    PermissionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
  },
        {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorHandlerInterceptor,
    },
  ],
})
export class AppModule {
}
