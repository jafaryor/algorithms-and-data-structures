/*
    Converts the tree to flat array. Like this:
    [ { id: 4, parentId: null },
    { id: 10, parentId: 4 },
    { id: 1, parentId: 10 },
    { id: 3, parentId: 4 },
    { id: 2, parentId: 3 },
    { id: 5, parentId: 2 },
    { id: 6, parentId: 2 },
    { id: 11, parentId: 6 },
    { id: 9, parentId: 2 } ]
*/

const tree = {
    id: 4,
    children: [{
        id: 10,
        children: [{
            id: 1,
            children: []
        }]
    }, {
        id: 3,
        children: [{
            id: 2,
            children: [{
                id: 5,
                children: []
            }, {
                id: 6,
                children: [{
                    id: 11,
                    children: []
                }]
            }, {
                id: 9,
                children: []
            }]
        }]
    }]
};
const flat = treeToFlat(tree);
console.log(flat);
const newTree = flatToTree(flat);
console.log(newTree);

function treeToFlat(tree) {
    return (function traverse(parentId, node, arr) {
        arr.push({
            id: node.id,
            parentId
        });

        node.children.forEach(child => traverse(node.id, child, arr));

        return arr;
    })(null, tree, []);
}


function flatToTree(flat) {
    const groupedByParentId = flat.reduce((acc, obj) => {
        if (obj.parentId in acc) {
            acc[obj.parentId].push(obj.id);
        } else {
            acc[obj.parentId] = [obj.id];
        }

        return acc;
    }, {});

    const rootObj = {
        id: groupedByParentId['null'][0],
        children: []
    };

    return (function traverse(parent) {
        const children = groupedByParentId[parent.id] || [];

        children.forEach(child => {
            parent.children.push(traverse({
                id: child,
                children: []
            }));
        });

        return parent;
    })(rootObj);
}