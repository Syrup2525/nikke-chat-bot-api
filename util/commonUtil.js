module.exports = {
    /**
     * 해당 값이 빈값인지 확인 (string인 경우 공백확인)
     * @param {*} value 
     * @returns 값이 빈 경우 true 반환
     */
    isBlank: (value) => {
        if (value === undefined || value === null) {
            return true
        }
    
        if (typeof value === 'boolean') {
            return false
        }
    
        if (typeof value === 'string') {
            if (value.trim() == "") {
                return true
            }
        }
    
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return true
            }
        }
    
        return false
    },
    /**
     * 객체 깊은 복사
     * @param {*} value 
     * @returns 
     */
    deepCopy: (value) => {
        return JSON.parse(JSON.stringify(value))
    },
    /**
     * Array 간소화 ([length] n 으로 변경)
     * @param {*} obj 변경할 객체
     * @returns 
     */
    convertArraysToLength: (obj) => {
        if (Array.isArray(obj)) {
            return `[length] ${obj.length}`
        }
    
        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                obj[key] = `[length] ${value.length}`
            } else if (!isBlank(value) && typeof value === 'object') {
                convertArraysToLength(value)
            }
        }
    
        return obj
    },
    /**
     * 로그 데이터 변경
     * @param {*} object Log Object
     * @param {boolean} isSimpleArray 배열 length 단순 표현 여부 (생략시 true)
     * @returns "JSON.stringify(object, null, 2)"
     */
    getLogData: (object, isSimpleArray) => {
        if (isSimpleArray === undefined || isSimpleArray === null || isSimpleArray == true) {
            try {
                const obj = convertArraysToLength(deepCopy(object))
    
                return JSON.stringify(obj, null, 2)
            } catch (err) {
                return JSON.stringify(object, null, 2)
            }
        } else {
            return JSON.stringify(object, null, 2)
        }
    },
    /**
     * min 부터 max 까지 숫자 랜덤 생성
     * @param {number} min 최소 숫자 
     * @param {number} max 최대 숫자
     * @returns {number} 생성된 숫자
     */
    getRandomNumber: (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)

        return Math.floor(Math.random() * (max - min + 1)) + min
    },
}