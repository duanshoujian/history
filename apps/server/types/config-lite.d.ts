declare module 'config-lite' {
  interface ConfigOptions {
    config_basedir?: string;
    config_dir?: string;
    config_name?: string;
    config_env?: string;
  }

  interface Config {
    [key: string]: any;
  }

  function config(options?: ConfigOptions): Config;
  export = config;
} 