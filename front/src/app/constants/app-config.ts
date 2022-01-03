import { environment } from '../../environments/environment';

export class AppConfig {
    public static URL_AppServices: string = environment.appServicesBaseUrl;
    public static URL_AuthBase: string = AppConfig.URL_AppServices + '/auth';
    public static URL_SignUp: string = AppConfig.URL_AuthBase + '/signup';
    public static SignUp = '/signup';
    public static URL_SignIn: string = AppConfig.URL_AuthBase + '/signin';
    public static SignIn = '/signin';
    public static URL_Verify: string = AppConfig.URL_AuthBase + '/verify';
    public static Verify = '/verify';
    public static URL_GenerateEmailOtp: string = AppConfig.URL_AuthBase + '/genEmailOtp';
    public static GenerateEmailOtp = '/genEmailOtp';
    public static URL_VerifyEmailOtp: string = AppConfig.URL_AuthBase + '/verifyEmailOtp';
    public static VerifyEmailOtp = '/verifyEmailOtp';
    public static URL_SignOut: string = AppConfig.URL_AuthBase + '/signout';
    public static SignOut = '/signout';

    public static URL_UserBase: string = AppConfig.URL_AppServices + '/api/user';

}
