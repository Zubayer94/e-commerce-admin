class Errors {
    errors = {
        
    }

    gerErrors() {
        return this.errors;
    }

    setErrors(errorData) {
        this.errors = errorData;
    }

    get(key) {
        return (this.errors[key] !== undefined) ? this.errors[key][0] : null;
    }

    reset() {
        this.errors = {};
    }
}
export default new Errors();