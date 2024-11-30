const TranslateKeyToHebrew = (key: string): string => {
    const translations: Record<string, string> = {
      BeginAstronomicalTwilight: 'התחלת בין הערביים האסטרונומית',
      AlosHashachar: 'עלות השחר',
      Sunrise: 'זריחה',
      Alos72: 'עלות השחר (72 דקות)',
      BeginNauticalTwilight: 'התחלת בין הערביים הימית',
      BeginCivilTwilight: 'התחלת בין הערביים האזרחית',
      SeaLevelSunrise: 'זריחה בגובה פני הים',
      SofZmanShmaMGA: 'סוף זמן קריאת שמע (מ"ג א)',
      SofZmanShmaGRA: 'סוף זמן קריאת שמע (גר"א)',
      SofZmanTfilaMGA: 'סוף זמן תפילה (מ"ג א)',
      SofZmanTfilaGRA: 'סוף זמן תפילה (גר"א)',
      Chatzos: 'חצות היום',
      SunTransit: 'מעבר השמש',
      MinchaGedola: 'מנחה גדולה',
      MinchaKetana: 'מנחה קטנה',
      PlagHamincha: 'פלג המנחה',
      CandleLighting: 'הדלקת נרות',
      SeaLevelSunset: 'שקיעה בגובה פני הים',
      Sunset: 'שקיעה',
      EndCivilTwilight: 'סיום בין הערביים האזרחית',
      Tzais: 'צאת הכוכבים',
      EndNauticalTwilight: 'סיום בין הערביים הימית',
      Tzais72: 'צאת הכוכבים (72 דקות)',
      EndAstronomicalTwilight: 'סיום בין הערביים האסטרונומית'
    };
    return translations[key] || key;
  };

  export default TranslateKeyToHebrew;