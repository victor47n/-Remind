const  generateUniqueId = require('../../utils/generateUniqueId');

describe('Generate Unique ID', () =>{
    it('should generate an unique ID', () => {
        const token = generateUniqueId();
        
        expect(token).toHaveLength(40);
    });
});
