export type RiskLevel = 'low' | 'medium' | 'high' | 'inconclusive';

export type ScamCategory =
  | 'phishing'
  | 'financial_impersonation'
  | 'fake_recruitment'
  | 'delivery_scam'
  | 'shopping_fraud'
  | 'suspicious_payment_request'
  | 'other'
  | 'unknown';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface RedFlag {
  indicator: string;
  evidence: string;
  explanation: string;
  indicator_bn?: string;
  evidence_bn?: string;
  explanation_bn?: string;
}

export interface AnalysisResult {
  risk_level: RiskLevel;
  category: ScamCategory;
  confidence: ConfidenceLevel;
  summary: string;
  summary_bn?: string;
  language_detected: string;
  red_flags: RedFlag[];
  recommended_actions: string[];
  recommended_actions_bn?: string[];
  bangla_explanation: string;
  limitations: string[];
  limitations_bn?: string[];
  input_type?: 'text' | 'image';
  extracted_text?: string;
  analyzed_at?: string;
}

export interface AnalysisRequest {
  text?: string;
  language?: 'bn' | 'en' | 'auto';
  image?: string; // base64
  mimeType?: string;
}

export interface AnalysisApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  details?: string;
}
