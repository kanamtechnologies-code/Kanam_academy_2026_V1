import QRCode from "qrcode";

const QR_OPTS = {
  margin: 1,
  errorCorrectionLevel: "M" as const,
  color: { dark: "#0f172a", light: "#ffffff" },
};

export async function classQrDataUrl(joinUrl: string, width = 320): Promise<string> {
  return QRCode.toDataURL(joinUrl, { ...QR_OPTS, width });
}

export async function classQrPngBuffer(joinUrl: string, width = 720): Promise<Buffer> {
  return QRCode.toBuffer(joinUrl, { ...QR_OPTS, type: "png", width });
}
