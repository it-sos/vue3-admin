module.exports = {
  env:{                          //指定代码的运行环境
    browser: true,
    node: true,
  },
  parser:  'vue-eslint-parser', //定义ESLint的解析器
  extends: [
    // 'plugin:vue/vue3-essential', // 防止错误或意外行为的规则。
    'plugin:vue/vue3-recommended', // 加上强制执行主观社区默认值以确保一致性的规则。
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],//定义文件继承的子规范
  plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
  parserOptions: {
    parser: '@typescript-eslint/parser',
    "ecmaVersion": 2020,
    "sourceType": 'module',
    "ecmaFeatures":{
      jsx:true
    }
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    // 'no-use-before-define': [
    //   'error',
    //   {
    //     functions: false,
    //     classes: true,
    //   },
    // ],
    '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': [
    //   'error',
    //   {
    //     functions: false,
    //     classes: true,
    //   },
    // ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^h$',
    //     varsIgnorePattern: '^h$'
    //   }
    // ],
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^h$',
    //     varsIgnorePattern: '^h$'
    //   }
    // ],
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  },
};
