const Utils = {
    convertDataSnapshotToObject: dataSnapshot => {
        const obj = {}
        dataSnapshot.map(item => {
            obj[`${item.key}`] = item.val()
            return item
        })
        return obj
    }
}

export default Utils