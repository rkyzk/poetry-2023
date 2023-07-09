
let categorized;
const [category, setCategory] = useState("");
if (page === categorized ) {
  categorized = true;
}

const categories = (
    <>
      <Button onClick={() => {setCategory("nature")}}>nature</Button>
      <Button onClick={() => {setCategory("love")}}>love</Button>
      <Button onClick={() => {setCategory("people")}}>people</Button>
      <Button onClick={() => {setCategory("humor")}}>humor</Button>
      <Button onClick={() => {setCategory("haiku")}}>haiku</Button>
      <Button onClick={() => {setCategory("other")}}>other</Button>
    </>
  )