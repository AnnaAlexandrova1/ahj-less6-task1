import Board from './Board';
import Logic from './Logic';

const container = document.querySelector('.container');
const board = new Board(container);

const logic = new Logic(board);
logic.init();
