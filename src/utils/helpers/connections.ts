export const getEnvironmentFile = ():string => {
    const env = process.env.NODE_ENV || 'development';

    return `.${env}.env`;
}