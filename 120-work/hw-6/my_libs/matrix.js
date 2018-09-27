let err = new Errors() ;

class Matrix {

    constructor(matrix_) {
        this.matrix = matrix_;
        return this;
    }


    //stolen from:
    //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript

    add(addend) {
        let sum = [] ;
        if (this.matrix.length !== addend.matrix.length) {
            throw err.mismatch()
        } else {
            let sum = [];
            for (let row = 0; row <= this.matrix.length - 1; row++) {
                sum[row] = [];
                for (let column = 0; column <= this.matrix[row].length - 1; column++) {
                    sum[row][column] = this.matrix[row][column] + addend.matrix[row][column];
                }
            }
        }
        return createMatrix(sum);
    }

    mult(factor) {
        let product = [];

        const cols = this.matrix[0].length ;
        const rows = factor.matrix.length ;

        if (cols !== rows) {
            throw err.composite()
        } else {
            for (let i = 0; i < this.matrix.length; i++) {
                product[i] = [];
                for (let j = 0; j < factor.matrix[0].length; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.matrix[0].length; k++) {
                        sum += this.matrix[i][k] * factor.matrix[k][j];
                    }
                    product[i][j] = sum;
                }
            }
        }

        return createMatrix(product);

    }

    convert() {
        //TODO: return an array of vectors when possible; maybe truncate and warn rather than throw hard error?
        if (this.matrix.length === 0 || this.matrix.length > 1 || this.matrix[0].length < 2 || this.matrix[0].length > 3) {
            throw err.notVector() ;
        } else {
            return createVector(this.matrix[0][0], this.matrix[0][1], this.matrix[0][2]) ;
        }
    }
}

class TransformMatrix {

    constructor() {
        return this;
    }

    ident() {

        const matrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        return createMatrix(matrix);
    }
    ;

    rotX(theta) {

        const matrix = [
            [1, 0, 0],
            [0, cos(theta), -sin(theta)],
            [0, sin(theta), cos(theta)]
        ];
        return createMatrix(matrix);
    };

    rotY(theta) {

        const matrix = [
            [cos(theta), 0, sin(theta)],
            [0, 1, 0],
            [-sin(theta), 0, cos(theta)]
        ];
        return createMatrix(matrix);
    };

    rotZ(theta) {

        const matrix = [
            [cos(theta), -sin(theta), 0],
            [sin(theta), cos(theta), 0],
            [0, 0, 1]
        ];
        return createMatrix(matrix);
    };
}



function createMatrix(matrix_) {
    return new Matrix(matrix_) ;
}

function convertVector(vector_) {
    return new Matrix([[vector_.x,vector_.y,vector_.z]]) ;
}

function createTransform() {
    return new TransformMatrix() ;
}

function Errors() {
    this.mismatch = function() {
        return Error('invalid matrix: must be same order') ;
    } ;

    this.composite = function() {
        return Error('invalid matrix: factor rows must equal coefficient columns') ;
    } ;

    this.notVector = function() {
        return Error('matrix order is not two or three dimension')
    } ;
}
