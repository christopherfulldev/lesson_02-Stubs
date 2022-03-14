"use strict"
const { deepStrictEqual} = require("assert")
const serviceRequest = require("../service");
const sinon = require("sinon");
const BASE_URL = require("../base-urls");
const mocks = {
    tatooine: require("./mocks/tatooine.json"),
    alderaan: require("./alderaan.json")
};

(async () => {
    // {
    //     const withoutStub = await serviceRequest.makeRequest(BASE_URL.BASE_URL2);
    //     console.log(JSON.stringify(withoutStub));
    // } busca na API

    {
        const stub = sinon.stub(serviceRequest, serviceRequest.makeRequest.name);

        stub 
            .withArgs(BASE_URL.BASE_URL1)
            .resolves(mocks.tatooine);

        stub
            .withArgs(BASE_URL.BASE_URL2)
            .resolves(mocks.alderaan);
    }

    {
        const expect = {
            "name": "tatooine",
            "surfaceWater": "1",
            "appearedIn": "5"
        }

        const result = await serviceRequest.getPlanets(BASE_URL.BASE_URL1)
        deepStrictEqual(results, expect);
    }

    {
        const expect = {
            "name": "Alderaan",
            "surfaceWater": "40",
            "appearedIn": "2"
        }

        const result = await serviceRequest.getPlanets(BASE_URL.BASE_URL2)
        deepStrictEqual(results, expect);
    }
})();