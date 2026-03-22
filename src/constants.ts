export interface ConceptBlank {
  id: string;
  answer: string;
  hint?: string;
  options?: string[];
}

export interface ConceptSection {
  id: string;
  title: string;
  content: (string | ConceptBlank)[];
}

export const CONCEPTS: ConceptSection[] = [
  {
    id: 'exponents',
    title: '1. 지수 (Exponents)',
    content: [
      '지수의 정의: a가 실수이고 n이 양의 정수일 때, a를 n번 거듭하여 곱한 것을 a의 n제곱이라 하고 ',
      { id: 'exp-1', answer: 'aⁿ', hint: '기호로 표현', options: ['aⁿ', 'na', 'a+n', 'a/n'] },
      '으로 나타낸다. 이때 a를 ',
      { id: 'exp-2', answer: '밑', hint: '아래에 있는 수' },
      ', n을 ',
      { id: 'exp-3', answer: '지수', hint: '위에 있는 수' },
      '라고 한다.\n\n',
      '지수법칙 (a > 0, b > 0):\n',
      '1) aᵐ × aⁿ = ',
      { id: 'exp-4', answer: 'aᵐ⁺ⁿ', hint: '지수끼리 더함', options: ['aᵐ⁺ⁿ', 'aᵐ⁻ⁿ', 'aᵐⁿ', 'aᵐ/ⁿ'] },
      '\n2) (aᵐ)ⁿ = ',
      { id: 'exp-5', answer: 'aᵐⁿ', hint: '지수끼리 곱함', options: ['aᵐⁿ', 'aᵐ⁺ⁿ', 'aᵐ/ⁿ', 'aᵐ⁻ⁿ'] },
      '\n3) (ab)ⁿ = ',
      { id: 'exp-6', answer: 'aⁿbⁿ', hint: '지수 분배', options: ['aⁿbⁿ', 'abⁿ', 'aⁿb', '(ab)ⁿ⁺¹'] },
      '\n4) a⁰ = ',
      { id: 'exp-7', answer: '1', hint: '모든 수의 0제곱', options: ['1', '0', 'a', '-1'] },
      ' (단, a ≠ 0)\n5) a⁻ⁿ = ',
      { id: 'exp-8', answer: '1/aⁿ', hint: '음수 지수', options: ['1/aⁿ', '-aⁿ', 'aⁿ', '1/nᵃ'] }
    ]
  },
  {
    id: 'logarithms',
    title: '2. 로그 (Logarithms)',
    content: [
      '로그의 정의: a > 0, a ≠ 1이고 N > 0일 때, aˣ = N을 만족시키는 실수 x는 오직 하나 존재한다. 이 x를 ',
      { id: 'log-1', answer: 'logₐN', hint: '로그 기호', options: ['logₐN', 'logₙa', 'aˡᵒᵍᴺ', 'Nˡᵒᵍᵃ'] },
      '으로 나타낸다. 이때 a를 ',
      { id: 'log-2', answer: '밑', hint: '로그의 아래' },
      ', N을 ',
      { id: 'log-3', answer: '진수', hint: '로그의 위' },
      '라고 한다.\n\n',
      '로그의 성질 (a > 0, a ≠ 1, M > 0, N > 0):\n',
      '1) logₐ1 = ',
      { id: 'log-4', answer: '0', hint: '진수가 1이면', options: ['0', '1', 'a', 'log a'] },
      '\n2) logₐa = ',
      { id: 'log-5', answer: '1', hint: '밑과 진수가 같으면', options: ['1', '0', 'a', 'log 1'] },
      '\n3) logₐ(MN) = ',
      { id: 'log-6', answer: 'logₐM + logₐN', hint: '곱셈은 덧셈으로', options: ['logₐM + logₐN', 'logₐM × logₐN', 'logₐM - logₐN', 'logₐ(M+N)'] },
      '\n4) logₐ(M/N) = ',
      { id: 'log-7', answer: 'logₐM - logₐN', hint: '나눗셈은 뺄셈으로', options: ['logₐM - logₐN', 'logₐM / logₐN', 'logₐM + logₐN', 'logₐ(M-N)'] },
      '\n5) logₐMᵏ = ',
      { id: 'log-8', answer: 'k logₐM', hint: '진수의 지수는 앞으로', options: ['k logₐM', 'logₐ(kM)', '(logₐM)ᵏ', 'k + logₐM'] }
    ]
  },
  {
    id: 'exp-functions',
    title: '3. 지수함수 (Exponential Functions)',
    content: [
      '지수함수의 정의: a > 0, a ≠ 1일 때, 실수 x에 대하여 ',
      { id: 'ef-1', answer: 'y = aˣ', hint: '함수 식', options: ['y = aˣ', 'y = xᵃ', 'y = logₐx', 'y = ax'] },
      '의 꼴로 나타내어지는 함수를 지수함수라고 한다.\n\n',
      '지수함수의 성질:\n',
      '1) 정의역은 실수 전체의 집합이고, 치역은 ',
      { id: 'ef-2', answer: '양의 실수', hint: 'y의 범위', options: ['양의 실수', '실수 전체', '음의 실수', '0이 아닌 실수'] },
      ' 전체의 집합이다.\n',
      '2) a > 1일 때 x가 증가하면 y도 ',
      { id: 'ef-3', answer: '증가', hint: '함수의 증감', options: ['증가', '감소', '일정', '0'] },
      '한다.\n',
      '3) 0 < a < 1일 때 x가 증가하면 y는 ',
      { id: 'ef-4', answer: '감소', hint: '함수의 증감', options: ['감소', '증가', '일정', '1'] },
      '한다.\n',
      '4) 그래프는 항상 점 ',
      { id: 'ef-5', answer: '(0, 1)', hint: 'y절편', options: ['(0, 1)', '(1, 0)', '(0, 0)', '(1, 1)'] },
      '을 지나고, 점근선은 ',
      { id: 'ef-6', answer: 'x축', hint: '또는 y=0', options: ['x축', 'y축', 'y=x', '원점'] },
      '이다.'
    ]
  },
  {
    id: 'log-functions',
    title: '4. 로그함수 (Logarithmic Functions)',
    content: [
      '로그함수의 정의: a > 0, a ≠ 1일 때, 양의 실수 x에 대하여 ',
      { id: 'lf-1', answer: 'y = logₐx', hint: '함수 식', options: ['y = logₐx', 'y = aˣ', 'y = x/a', 'y = logₓa'] },
      '의 꼴로 나타내어지는 함수를 로그함수라고 한다.\n\n',
      '로그함수의 성질:\n',
      '1) 정의역은 ',
      { id: 'lf-2', answer: '양의 실수', hint: 'x의 범위', options: ['양의 실수', '실수 전체', '음의 실수', '1보다 큰 실수'] },
      ' 전체의 집합이고, 치역은 실수 전체의 집합이다.\n',
      '2) a > 1일 때 x가 증가하면 y도 ',
      { id: 'lf-3', answer: '증가', hint: '함수의 증감', options: ['증가', '감소', '일정', '0'] },
      '한다.\n',
      '3) 0 < a < 1일 때 x가 증가하면 y는 ',
      { id: 'lf-4', answer: '감소', hint: '함수의 증감', options: ['감소', '증가', '일정', '1'] },
      '한다.\n',
      '4) 그래프는 항상 점 ',
      { id: 'lf-5', answer: '(1, 0)', hint: 'x절편', options: ['(1, 0)', '(0, 1)', '(0, 0)', '(1, 1)'] },
      '을 지나고, 점근선은 ',
      { id: 'lf-6', answer: 'y축', hint: '또는 x=0', options: ['y축', 'x축', 'y=x', '원점'] },
      '이다.\n',
      '5) 로그함수 y = logₐx는 지수함수 y = aˣ의 ',
      { id: 'lf-7', answer: '역함수', hint: 'y=x 대칭', options: ['역함수', '도함수', '합성함수', '상수함수'] },
      '이다.'
    ]
  }
];
