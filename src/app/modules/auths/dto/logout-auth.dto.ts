import { IsNotEmpty, IsString } from "class-validator";

export class LogoutAllDevicesAuthDto {
    @IsString()
    userId: string;
}

export class LogoutDeviceAuthDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;
}

export class LogoutNotDeviceAuthDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    deviceId: string;
}