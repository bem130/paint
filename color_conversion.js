//* https://qiita.com/akebi_mh/items/3377666c26071a4284ee より 少し変更 */
/**
 *  hsv2rgb (h, s, v)
 */
function hsv2rgb(h, s, v) {
    // 引数処理
    h = (h < 0 ? h % 360 + 360 : h) % 360 / 60;
    s = s < 0 ? 0 : s > 1 ? 1 : s;
    v = v < 0 ? 0 : v > 1 ? 1 : v;

    // HSV to RGB 変換
    const c = [5, 3, 1].map(function(i) {
        return Math.round((v - Math.max(0, Math.min(1, 2 - Math.abs(2 - (h + i) % 6))) * s * v) * 255);
    });

    // 戻り値
    return c;
}