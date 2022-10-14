module.exports = {
  root: true,
  env: {
    // browser: true,
    // es2021: true,
    node: true,
  },
  globals: {
    // Ref sugar (take 2)
    $: 'readonly',
    $$: 'readonly',
    $ref: 'readonly',
    $shallowRef: 'readonly',
    $computed: 'readonly',

    // index.d.ts
    // global.d.ts
    Fn: 'readonly',
    PromiseFn: 'readonly',
    RefType: 'readonly',
    LabelValueOptions: 'readonly',
    EmitType: 'readonly',
    TargetContext: 'readonly',
    ComponentElRef: 'readonly',
    ComponentRef: 'readonly',
    ElRef: 'readonly',
    global: 'readonly',
    ForDataType: 'readonly',
    ComponentRoutes: 'readonly',

    // script setup
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    defineOptions: 'readonly',
    ITableCol: 'readonly',
    ITableBtn: 'readonly',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',

    'prettier', //?
    '@vue/prettier', // @vue/eslint-config-prettier
    '@vue/eslint-config-typescript',
  ],
  overrides: [],

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['vue', '@typescript-eslint', 'prettier'],
  // prettier: eslint-plugin-prettier
  rules: {
    // eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      {
        // 一行最多 100 字符
        printWidth: 100,
        // 使用 4 个空格缩进
        tabWidth: 2,
        // 不使用缩进符，而使用空格
        useTabs: false,
        // 行尾不需要有分号
        semi: false,
        // 使用单引号
        singleQuote: true,
        // 对象的 key 仅在必要时用引号
        quoteProps: 'as-needed',
        // jsx 不使用单引号，而使用双引号
        jsxSingleQuote: false,
        // 尾随逗号
        trailingComma: 'es5',
        // 大括号内的首尾需要空格
        bracketSpacing: true,
        // jsx 标签的反尖括号需要换行
        jsxBracketSameLine: false,
        // 箭头函数，只有一个参数的时候，也需要括号
        arrowParens: 'always',
        // 每个文件格式化的范围是文件的全部内容
        rangeStart: 0,
        rangeEnd: Infinity,
        // 不需要写文件开头的 @prettier
        requirePragma: false,
        // 不需要自动在文件开头插入 @prettier
        insertPragma: false,
        // 使用默认的折行标准
        proseWrap: 'preserve',
        // 根据显示样式决定 html 要不要折行
        htmlWhitespaceSensitivity: 'css',
        // 换行符使用 lf
        endOfLine: 'auto',
      },
    ],

    // 自定义规则

    'no-debugger': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': ['off'], //禁止使用any
    '@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // note you must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-vars': 0,
    eqeqeq: 2, //必须使用全等
    'max-lines': ['error', 500], //限制行数 请勿修改 请优化你的代码
    complexity: ['error', 16], // 限制复杂度
    'require-await': 'error',
    'no-undef':0
  },
}
