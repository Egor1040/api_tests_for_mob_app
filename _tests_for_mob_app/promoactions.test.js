const axios = require('axios');
const https = require('https');

test("Отримання банерів акцій з сайту", async () => {
    const params = {
        api_key: '314dK00V358HT4E05S0bTiq85MxZ4j9D'
    };

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        const response = await axios.get('https://ecom-test-proxy.avrora.lan/mobile_app/promoactions/', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: params,
            httpsAgent: agent
        });
        expect(response.status).toEqual(200);

        expect(response.data).toHaveProperty('promo');
        expect(Array.isArray(response.data.promo)).toBe(true);

        response.data.promo.forEach(promotion => {
            expect(promotion).toHaveProperty('promo_id');
            expect(typeof promotion.promo_id).toBe('string');
            expect(promotion.promo_id).not.toBe('');

            expect(promotion).toHaveProperty('promo_name');
            expect(typeof promotion.promo_name).toBe('string');
            expect(promotion.promo_name).not.toBe('');

            expect(promotion).toHaveProperty('from_date');
            expect(typeof promotion.from_date).toBe('number');

            expect(promotion).toHaveProperty('to_date');
            expect(typeof promotion.to_date).toBe('number');

            expect(promotion).toHaveProperty('img');
            expect(typeof promotion.img).toBe('string');
            if (promotion.img !== '') {
                expect(promotion.img).toMatch(/^https?:\/\/.+/);
            }

            expect(promotion).toHaveProperty('link');
            expect(typeof promotion.link).toBe('string');
            expect(promotion.link).toMatch(/^https?:\/\/.+/);

            expect(promotion).toHaveProperty('status');
            expect(typeof promotion.status).toBe('number');
            expect([0, 1]).toContain(promotion.status);
        });

    } catch (error) {
        if (error.response) {
            console.error('Error fetching promotions:', error.response.data);
            console.error('Status code:', error.response.status);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
});
