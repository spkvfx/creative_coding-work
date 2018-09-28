let err = new Errors() ;

class Matrix {

    constructor(matrix_) {
        //TODO: maybe add a vector property here rather than convert()
        this.matrix = matrix_;
        return this;
    }

    //matrix addition
    add(addend) {
        //verify that the matrix is valid
        if (this.matrix.length !== addend.matrix.length) {
            throw err.mismatch()
        } else {
            //init the sum array
            let sum = [];
            //iterate over rows
            for (let row = 0; row <= this.matrix.length - 1; row++) {
                //init the rows array
                sum[row] = [];
                //iterate over columns
                for (let column = 0; column <= this.matrix[row].length - 1; column++) {
                    //add components
                    sum[row][column] = this.matrix[row][column] + addend.matrix[row][column];
                }
            }
        }
        //create and return the new matrix
        return createMatrix(sum);
    }

    //this was frikkin hard! It was eventually just stolen from:
    //https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    mult(factor) {
        //init the product
        let product = [];

        //check that the matrix is valid
        const cols = this.matrix[0].length ;
        const rows = factor.matrix.length ;
        if (cols !== rows) {
            throw err.composite()
        } else {
            //initialize the rows
            for (let i = 0; i < rows; i++) {
                product[i] = [];
                //get columns
                for (let j = 0; j < cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.matrix[0].length; k++) {
                        //multiple the rows to the colunmn and sum the column
                        sum += this.matrix[i][k] * factor.matrix[k][j];
                    }
                    //temp store the result
                    product[i][j] = sum;
                }
            }
        }
        //create and return the new matrix
        return createMatrix(product);

    }

    //convert a 1x3 matrix into a p5 vector
    convert() {
        //make the the matrix is the right type
        //TODO: return an array of vectors when possible; maybe truncate and warn rather than throw hard error?
        if (this.matrix.length === 0 || this.matrix.length > 1 || this.matrix[0].length < 2 || this.matrix[0].length > 3) {
            throw err.notVector() ;
        } else {
            //return the vector
            return createVector(this.matrix[0][0], this.matrix[0][1], this.matrix[0][2]) ;
        }
    }
}

class TransformMatrix {

    //I don't totally understand this...
    constructor() {
        return this;
    }

    //identity matrix, just for testing
    ident() {

        const matrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        return createMatrix(matrix);
    }

    //rotation matrices from wikipedia
    //rotation along x
    rotX(theta) {

        const matrix = [
            [1, 0, 0],
            [0, cos(theta), -sin(theta)],
            [0, sin(theta), cos(theta)]
        ];
        return createMatrix(matrix);
    };

    //rotation along y
    rotY(theta) {

        const matrix = [
            [cos(theta), 0, sin(theta)],
            [0, 1, 0],
            [-sin(theta), 0, cos(theta)]
        ];
        return createMatrix(matrix);
    };

    //rotation along z
    rotZ(theta) {

        const matrix = [
            [cos(theta), -sin(theta), 0],
            [sin(theta), cos(theta), 0],
            [0, 0, 1]
        ];
        return createMatrix(matrix);
    };
}


//callable functions to create classes. not sure if this is remotely the right way to do this, but it works.
function createMatrix(matrix_) {
    return new Matrix(matrix_) ;
}

function convertVector(vector_) {
    return new Matrix([[vector_.x,vector_.y,vector_.z]]) ;
}

function createTransform() {
    return new TransformMatrix() ;
}

//errors for easy access
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
