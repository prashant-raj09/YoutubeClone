import Button from "./Button";

const List = [
  "All",
  "Gaming",
  "Song",
  "Live",
  "Soccer",
  "Cricket",
  "News",
  "Movies",
  "Cooking",
  "Namaste React",
  "Namaste Node"
];

const ButtonList = () => {
  return <div className="flex">
    {List.map((item)=> <Button key={item} name={item}/>)}
  </div>;
};

export default ButtonList;