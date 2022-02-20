import '../assets/styles/CeStudySet.css'
import { Textarea } from '../components'
import { Button, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect, useRef, useCallback } from "react"
import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import { Notify, Firebase } from "../utils"
import { useHistory } from "react-router-dom"
import { Utils } from "../utils"

const CeStudySet = (props) => {
    const { idAuthor, id, studysetProp } = props
    const history = useHistory()
    const [ y, setY ] = useState(window.scrollY)
    const strickyRef = useRef(null)

    const [ suggestions, setSuggestions ] = useState([])
    const [ timer, setTimer ] = useState(null)

    const createwordCard = (key, value) => ({
        id: uuidv4(),
        key: key ? key : '',
        value: value ? value : '',
        errorkey: '',
        errorvalue: ''
    })

    const [studyset, setStudyset] = useState({
        title: {
            value: studysetProp ? studysetProp.title : '',
            error: ''
        },
        description: {
            value: studysetProp ? studysetProp.description : '',
            error: ''
        },
        wordCards: studysetProp
            ? studysetProp.wordCards.map(item => createwordCard(item.key, item.value))
            : [createwordCard('', ''), createwordCard('', ''), createwordCard('', '')]
    })

    const validate = () => {
        let res = true
        const newStudyset = _.cloneDeep(studyset)
        newStudyset.title.value = newStudyset.title.value.trim()
        newStudyset.description.value = newStudyset.description.value.trim()
        newStudyset.wordCards = newStudyset.wordCards
            .map(item => ({ ...item, key: item.key.trim(), value: item.value.trim() }))

        const { title, description, wordCards } = newStudyset

        if (!title.value) {
            title.error = 'Title cannot be left blank!'
            res = false
        }
        if (!description.value) {
            description.error = 'Description cannot be left blank!'
            res = false
        }

        for (const item of wordCards) {
            if (!item.key) {
                item.errorkey = 'Term cannot be left blank!'
                res = false
            }
            if (!item.value) {
                item.errorvalue = 'Definition cannot be left blank!'
                res = false
            }
        }

        setStudyset(newStudyset)
        return res
    }

    const cleanStudyset = studyset => {
        return {
            title: studyset.title.value.trim(),
            description: studyset.description.value.trim(),
            wordCards: studyset.wordCards.map(item => ({key: item.key.trim(), value: item.value.trim()}))
        }
    }

    const handlesubmit = () => {
        if (validate()) {
            const studysetDb = cleanStudyset(studyset)

            let res = false
            if(studysetProp) res = Firebase.updateStudySet(idAuthor, id, studysetDb)
            else res = Firebase.addStudySet(studysetDb)
            
            if (res) {
                Notify.success(studysetProp ? "Updated successfully!" : "Created successfully!" )
                history.goBack()
            }
            else Notify.error('Error, try again!')
        }
    }

    const handlewordCardChange = (index, value, attribute) => {
        // Xóa timer cũ
        clearTimeout(timer)

        // Xõa gợi ý trước
        setSuggestions([])

        // Set value cho input
        const newStudyset = _.cloneDeep(studyset)
        newStudyset.wordCards[index][attribute] = value
        newStudyset.wordCards[index][`error${attribute}`] = ''
        setStudyset(newStudyset)

        if(attribute === 'key')
            setTimer(setTimeout(() => {
                // Gọi api để lấy nghĩa của từ
                Utils.getDefinition(value).then(data => setSuggestions({index, data}))
            }, 1000)) // delay 1 giây coi như người dùng nhập xong
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result
        const startIndex = source.index
        const endIndex = destination.index

        const newwordCards = _.cloneDeep(studyset.wordCards)
        const [ removed ] = newwordCards.splice(startIndex, 1)
        newwordCards.splice(endIndex, 0, removed)
        setStudyset({...studyset, wordCards: newwordCards})
    }

    useEffect(() => {
        if(y === 0) {
            strickyRef.current.style.boxShadow = "none"
            strickyRef.current.style.zIndex = "1000"
        }
        else {
            strickyRef.current.style.boxShadow = "0 0.25rem 1rem 0 rgb(0 0 0 / 16%)"
            strickyRef.current.style.zIndex = "2000"
        }
    }, [y])

    const handleScroll = useCallback(e => {
        const window = e.currentTarget
        setY(window.scrollY)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return <div className="CeStudySet-container">
        <div className="stricky-information mt-5" ref={strickyRef}>
            <div className="container-xl">
                <div className="infomation d-sm-flex">
                    <p className="title">
                        {studysetProp ? "Update study set" : "Create a new study set"}
                    </p>
                    <Button className="fw-bold mt-3 mt-sm-0" onClick={handlesubmit}>
                        {studysetProp ? "Save" : "Create"}
                    </Button>
                </div>
            </div>
        </div>

        <div className="container-xl">
            <div className="row">
                <div className="col col-md-6">
                    <Textarea
                        enter={false}
                        title="TITLE"
                        placeholder='Enter a title, like "Animals"'
                        value={studyset.title.value}
                        error={studyset.title.error}
                        maxLength={255}
                        onChange={e => setStudyset({ ...studyset, title: { value: e.target.value, error: '' } })}
                    />
                </div>
            </div>

            <div className="row my-4">
                <div className="col col-md-6">
                    <Textarea
                        enter={false}
                        title="DESCRIPTION"
                        placeholder='Add a description'
                        value={studyset.description.value}
                        error={studyset.description.error}
                        maxLength={255}
                        onChange={e => setStudyset({ ...studyset, description: { value: e.target.value, error: '' } })}
                    />
                </div>
            </div>
        </div>

        <div className="wordCards py-4">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) =>
                        <div className="container-xl" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                studyset.wordCards.map((item, index) =>
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) =>
                                            <div className="wordCard-input mb-4" key={item.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }}>
                                                <div className="header">
                                                    <span className="index">{index + 1}</span>
                                                    <span className="ms-auto drag-icon"><i className="fas fa-grip-lines" /></span>

                                                    <OverlayTrigger placement="left" overlay={<Tooltip>Remove</Tooltip>}>
                                                        <Badge
                                                            bg="danger" className="delete-icon"
                                                            onClick={e => setStudyset({
                                                                ...studyset,
                                                                wordCards: [...studyset.wordCards.filter((item, i) => studyset.wordCards.length > 3 ? i !== index : true)]
                                                            })}
                                                        ><i className="fas fa-trash-alt fs-6" /></Badge>
                                                    </OverlayTrigger>
                                                </div>

                                                <div className="row input-type">
                                                    <div className="col-md-6">
                                                        <Textarea
                                                            enter="true"
                                                            title="TERM"
                                                            placeholder='Enter term'
                                                            value={item.key}
                                                            error={item.errorkey}
                                                            onChange={e => handlewordCardChange(index, e.target.value, 'key')}
                                                        />
                                                    </div>

                                                    <div className="col-md-6 mt-5 mt-md-0">
                                                        <Textarea
                                                            enter="true"
                                                            title="DEFINITION"
                                                            placeholder='Enter definition'
                                                            value={item.value}
                                                            error={item.errorvalue}
                                                            onChange={e => handlewordCardChange(index, e.target.value, 'value')}
                                                        />

                                                        {index === suggestions?.index && suggestions?.data?.map((suggestion, idx) => <div key={`${item.id}-${idx}`} className="suggestion mt-2 p-2" onClick={e => handlewordCardChange(index, suggestion, 'value')}>{suggestion}</div>)}
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </Draggable>
                                )
                            }
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>

            <div className="d-flex">
                <Button
                    variant="success"
                    className="fw-bold d-block d-sm-inline-block mx-auto"
                    onClick={e => setStudyset({
                        ...studyset,
                        wordCards: [...studyset.wordCards, { id: uuidv4(), key: '', value: '' }]
                    })}
                >
                    <i className="fas fa-plus"></i> Add card
                </Button>
            </div>
        </div>
    </div>
}

export default CeStudySet