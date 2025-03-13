interface ModelTokens {
  maxTokens: number
  responseTokens: number
}

const modelTokensMap: Record<string, ModelTokens> = {
  'default': {
    maxTokens: 32_768,
    responseTokens: 8_192,
  },
  'gpt-4-32k': {
    maxTokens: 32600,
    responseTokens: 4000,
  },
  'gpt-3.5-turbo-16k': {
    maxTokens: 16300,
    responseTokens: 3000,
  },
  'gpt-4': {
    maxTokens: 8000,
    responseTokens: 2000,
  },
  'qwen-coder-plus': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  // -------------------------
  // 适合复杂任务，推理能力最强
  'qwen-max': {
    maxTokens: 30_720,
    responseTokens: 8192,
  },
  'qwen-max-latest': {
    maxTokens: 30_720,
    responseTokens: 8192,
  },
  // 效果、速度、成本均衡
  'qwen-plus': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  'qwen-plus-latest': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  // 适合简单任务，速度快、成本极低
  'qwen-turbo': {
    maxTokens: 1_000_000,
    responseTokens: 8192
  },
  'qwen-turbo-latest': {
    maxTokens: 1_000_000,
    responseTokens: 8192
  },
  // 适合大规模文本分析，效果与速度均衡、成本较低
  'qwen-long': {
    maxTokens: 1_000_000,
    responseTokens: 8192
  },
  // 多模态输入
  'qwen-omni-turbo': {
    maxTokens: 1_000_000,
    responseTokens: 8192
  },
  'qwen-omni-turbo-latest': {
    maxTokens: 30_720,
    responseTokens: 2_048
  },
  // -------------------------
  'qwen-coder-plus-latest': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  'qwen-coder-turbo': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  'qwen-coder-turbo-latest': {
    maxTokens: 129_024,
    responseTokens: 8192,
  },
  'qwq-plus': {
    maxTokens: 98_304,
    responseTokens: 8192,
  },
  'qwq-plus-latest': {
    maxTokens: 98_304,
    responseTokens: 8192,
  },
  'qwq-32b-preview': {
    maxTokens: 30_720,
    responseTokens: 16_384,
  },
  'gemini-2.0-flash-lite': {
    maxTokens: 10_000_000,
    responseTokens: 8_000
  },
  'gemini-2.0-flash': {
    maxTokens: 10_000_000,
    responseTokens: 8_000
  }
}

export class TokenLimits {
  maxTokens: number
  requestTokens: number
  responseTokens: number
  knowledgeCutOff: string

  constructor(model = 'gpt-3.5-turbo') {
    this.knowledgeCutOff = '2024-12-01'
    const modelTokens = modelTokensMap[model] || modelTokensMap['default']

    // 设置最大tokens和响应tokens
    this.maxTokens = modelTokens.maxTokens
    this.responseTokens = modelTokens.responseTokens

    // provide some margin for the request tokens
    this.requestTokens = this.maxTokens - this.responseTokens - 100
  }

  string(): string {
    return `max_tokens=${this.maxTokens}, request_tokens=${this.requestTokens}, response_tokens=${this.responseTokens}`
  }
}
