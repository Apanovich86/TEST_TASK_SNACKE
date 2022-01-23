
export default function Player({item}) {
    return (
        <div>
            <p>id: {item.id}</p>
            <p>name: {item.name}</p>
            <p>score: {item.score}</p>
        </div>
    )
}