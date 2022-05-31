export default class BadgeInformation {

    /**
     * @param {String} name 배지 이름
     * @param {Number} count 배지 수량
     * @param {String} theme BS4 Color prefix
     * @param {String} icon icon name
     */
    constructor (name, count, theme, icon) {
        this.name = name;
        this._count = count;
        this.theme = theme;
        this.icon = icon;
    }
    set count(count) {
        this._count = count;
    }
    get count() {
        return this._count == 0 ? 0 : this._count;
    }
}