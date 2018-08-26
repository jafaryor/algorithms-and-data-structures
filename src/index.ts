export * from './data-structures';
export * from './sort';
export * from './selection';
/*
N containers
N + 1 slots
[ 2 | 4 | 3 | 5 | 1 | _ ]
  X

[ _ | 4 | 3 | 5 | 1 | 2 ]

[ 1 | 4 | 3 | 5 | _ | 2 ]

[ 1 | 4 | 3 | 5 | _ | 2 ]

[ 2 | 1 | 4 | 3 | _ ] O(n)

[ _ | 1 | 4 | 3 | 2 ] O(n)

[ 1 | _ | 4 | 3 | 2 ] O(n)

[ 1 | 2 | 4 | 3 | 5 | _ ]

[ 1 | 2 | 4 | _ | 3 ]

[ 1 | 2 | _ | 4 | 3 ]

[ 1 | 2 | 3 | 4 | _ ]

O(n^2)

function pickUp();
function putDown();
function moveRight();
function moveLeft();

// warehouse: array of 0 .. N -1 in some order, -1
// Assume robot is at position 0
function arrange(warehouse) {
	let lastSlot = null;
	let position = 0;
	let positionOfEmptySlot = N;
let lastIndexOfSortedPart = -1;

	for (let i = 0; i < N; i++) {
		if ()
	}

	pickUp();
	for (let j = 0; j < N; j++) {
		moveRight();
	}
	putDown();

}



function arrange(warehouse);

