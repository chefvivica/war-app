'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                username: 'demo_1',
                winCount: 11,
                lostCount: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'demo_2',
                winCount: 0,
                lostCount: 22,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'demo_3',
                winCount: 121,
                lostCount: 25,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
