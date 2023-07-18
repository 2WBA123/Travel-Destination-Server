export const getEnvironmentPath = (env) =>{
  return env.NODE_ENV !== 'production' ? `.${env.NODE_ENV || 'development'}` : '';
};
