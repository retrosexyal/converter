export const YANDEX_RTB_INLINE_BLOCK_ID =
  process.env.NEXT_PUBLIC_YANDEX_RTB_INLINE_BLOCK_ID?.trim() ?? "";

export const isYandexAdsEnabled = Boolean(YANDEX_RTB_INLINE_BLOCK_ID);
