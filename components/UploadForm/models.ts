import { ALLOWED_OUT_FORMAT } from "@/constants";
import { Locale } from "@/dictionary";

export type OutFormat = (typeof ALLOWED_OUT_FORMAT)[number];

export type UploadFormProps = {
  locale?: Locale;
  defaultFormat?: string;
  hideFormatSelect?: boolean;
  title?: string;
};
