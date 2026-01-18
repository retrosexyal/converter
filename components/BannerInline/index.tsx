export default function BannerInline() {
  return (
    <div className="border rounded p-4 bg-neutral-50">
      <div className="text-sm font-medium">Рекламный блок</div>
      <div className="text-xs text-neutral-600 mt-1">
        Здесь будет ваш баннер (PropellerAds / Adsterra и т.п.).
      </div>

      {/* Вставь сюда код рекламной сети (script/iframe/div) */}
      <div
        id="ad-inline-slot"
        className="mt-3 min-h-[90px] flex items-center justify-center border rounded bg-white text-xs text-neutral-500"
      >
        ad-slot
      </div>
    </div>
  );
}
