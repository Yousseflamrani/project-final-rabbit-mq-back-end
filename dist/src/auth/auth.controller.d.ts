import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(body: {
        email: string;
        password: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        password: string;
    }, unknown> & {}>;
}
