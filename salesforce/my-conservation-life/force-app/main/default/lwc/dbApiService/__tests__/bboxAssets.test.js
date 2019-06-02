import { API_URL } from '../config';
import bboxAssets from '../bboxAssets';

const createMockFetchJson = (jsonObject) => jest.fn(() => Promise.resolve({ ok: true, json: () => jsonObject }));

const BBOX_ASSETS_ENDPOINT = API_URL + 'bbox-assets';

describe('bboxAssets.get URL', () => {
    const EXPECTED_BBOX = { latitude_min: 0, latitude_max: 10, longitude_min: 20, longitude_max: 120 };
    let fetch;

    beforeEach(() => {
        fetch = createMockFetchJson(EXPECTED_BBOX);
        global.fetch = fetch;
    });

    it('fetches /bbox-assets with no args', async () => {
        const bbox = await bboxAssets.get();
        expect(fetch).toHaveBeenCalledWith(BBOX_ASSETS_ENDPOINT);
        expect(bbox).toEqual(EXPECTED_BBOX);
    });

    it('fetches with project_id query param given valid projectId arg', async () => {
        const bbox = await bboxAssets.get(1);
        expect(fetch).toHaveBeenCalledWith(BBOX_ASSETS_ENDPOINT + '?project_id=1');
        expect(bbox).toEqual(EXPECTED_BBOX);
    });

    it('fetches without project_id query param given invalid projectId arg of 0', async () => {
        const bbox = await bboxAssets.get(0);
        expect(fetch).toHaveBeenCalledWith(BBOX_ASSETS_ENDPOINT);
        expect(bbox).toEqual(EXPECTED_BBOX);
    });

    it('fetches without project_id query param given a string', async () => {
        const bbox = await bboxAssets.get('2');
        expect(fetch).toHaveBeenCalledWith(BBOX_ASSETS_ENDPOINT);
        expect(bbox).toEqual(EXPECTED_BBOX);
    });
});