import expect from 'expect';
import { addedTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted, allTodos } from '../../actions/Todos';
import * as types from '../../constants/ActionTypes';

describe('Actions Todos', () => {
	describe('addedTodo', () => {
		it('should return added todo', () => {
			const expected = {
				type: types.ADD_TODO,
				todo: {
					id: 1,
					text: 'test'
				}
			}
			const actual = addedTodo({id:1, text: 'test'});
			expect(actual).toEqual(expected);
		});
	});

	describe('deleteTodo', () => {
		it('should delete a todo', () => {
			const expected = {
				type: types.DELETE_TODO,
				id: 1
			};
			const actual = deleteTodo(1);
			expect(actual).toEqual(expected);
		});
	});

	describe('editTodo', () => {
		it('should edit a todo', () => {
			const expected = {
				type: types.EDIT_TODO,
				id: 1,
				text: 'test'
			};
			const actual = editTodo(1, 'test');
			expect(actual).toEqual(expected);
		});
	});

	describe('completeTodo', () => {
		it('should complete a todo', () => {
			const expected = {
				type: types.COMPLETE_TODO,
				id: 1
			};
			const actual = completeTodo(1);
			expect(actual).toEqual(expected);
		});
	});

	describe('completeAll', () => {
		it('should complete all', () => {
			const expected = {
				type: types.COMPLETE_ALL
			};
			const actual = completeAll();
			expect(actual).toEqual(expected);
		});
	});

	describe('clearCompleted', () => {
		it('should clear all completed todo', () => {
			const expected = {
				type: types.CLEAR_COMPLETED
			};
			const actual = clearCompleted();
			expect(actual).toEqual(expected);
		});
	});

	describe('allTodos', () => {
		it('should return all todos', () => {
			const expected = {
				type: types.ALL_TODOS,
				todos: [1,3,7,8]
			};
			const actual = allTodos([1,3,7,8]);
			expect(actual).toEqual(expected);
		});
	});
});