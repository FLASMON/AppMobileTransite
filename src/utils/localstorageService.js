class LocalStorageService {
    /**
     * Enregistre une donnée dans le localStorage avec une durée d'expiration.
     * @param {string} key - Clé pour identifier la donnée.
     * @param {any} value - Valeur à stocker.
     * @param {number} ttl - Temps en millisecondes avant expiration (optionnel).
     */
    static setItem(key, value, ttl = null) {
        const now = new Date();

        const item = {
            value: value,
            expiry: ttl ? now.getTime() + ttl : null
        };

        localStorage.setItem(key, JSON.stringify(item));
    }

    /**
     * Récupère une donnée dans le localStorage et vérifie si elle a expiré.
     * @param {string} key - Clé de la donnée à récupérer.
     * @returns {any|null} - Retourne la valeur si elle est valide, sinon `null`.
     */
    static getItem(key) {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        const now = new Date();

        // Vérifie si l'élément a une expiration et si elle est dépassée
        if (item.expiry && now.getTime() > item.expiry) {
            localStorage.removeItem(key); // Supprime l'élément expiré
            return null;
        }

        console.log(item)
        return item.value;
    }

    static getIDclient() {
        const data = this.getItem("token_client");
        return data.id_parent || null;
    }

    /**
     * Récupère le rôle du client stocké dans le localStorage.
     * @returns {string|null} - Retourne le rôle ou `null` si non trouvé.
     */
    static getRole() {
        const data = this.getItem("token_client");
        return data.role || null;
    }

    /**
     * Supprime une donnée du localStorage.
     * @param {string} key - Clé de la donnée à supprimer.
     */
    static removeItem(key) {
        localStorage.removeItem(key);
    }

    /**
     * Vide complètement le localStorage.
     */
    static clear() {
        localStorage.clear();
    }
}

export default LocalStorageService;
