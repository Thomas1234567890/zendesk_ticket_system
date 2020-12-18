//// when working with local json files we can just import them
//// for this test build I'll be using a minified array
import json_test_data from "./test_data.json";
let data = json_test_data.tickets;


// json_test_data.tickets.forEach(ele => console.log(ele.subject));
// console.log(json_test_data);

///define

// 	Connect to the Zendesk API / load local ticket array instead
// 	Request all the tickets for your account / let the user pick tickets tied to a user acount
// 	Display them in a list
// 	Display individual ticket details
// 	Page through tickets when more than 25 are returned / pagnation

//// production

const get_a_subject_by_id = (id : number) => 
{
  for (let i = 0; i < data.length; i++) {
    if (data[i].requester_id == id) {
      return data[i].subject;
    }
  }
  return false;
}

const get_all_requester_ids = () =>
{
  let result = [];
  for( let i = 0; i < data.length; i++)
  { 
    result.push(data[i].requester_id);
  }
  return result;
}

/// When a user selects a group id (assignee_id: 5), return all objects with the assigned group id
const get_all_objects_by_assignee_id = (id : number) =>
{
  let result = data.filter( (ele) => ele.assignee_id === id );
  return result;
}



//// solution

///bind requester_id 's to dropdown
const bind_requester_id_to_dropdown = () => 
{
  const requester_ids = get_all_requester_ids();
  requester_ids.forEach(element => option_scaffold(element) );
}
const option_scaffold = (element) =>
{
  let html_select = document.getElementById('requester_id_dropdown');
  let option = document.createElement('option');
  option.id = element;
  option.text = element;
  html_select.append(option);
};
//// when the user selects a requester id display the subject 
const show_requester_ids_dropdown_subject = () =>
{
    let selected_id = document.getElementById('requester_id_dropdown').id;
    let subject = get_a_subject_by_id(parseInt(selected_id));
}

function scaffold_html()
{
bind_requester_id_to_dropdown();
}
// scaffold_html();

//// test

//// get all the subjects as a string and compare them to the expected value
//// json_test_data comes from local import
let test_json_connection = (expected_result) => {
  const result = data.map(x => x.subject).join("");
  return result === expected_result ? true : false;
}

const test_get_all_requester_ids = (expected_result : Array<number>) =>
{
  let arr = get_all_requester_ids();
  let result = arr.join('');
  return result === expected_result.join('') ? true : false;
}
 
let test_get_a_subject_by_id = (id : number, expected_result: string) => 
{
  const result = get_a_subject_by_id(id);
  return result === expected_result ? true : false;
}

let test_get_all_objects_by_assignee_id = (id :number, expected_result :string) => 
{
  let result = JSON.stringify(get_all_objects_by_assignee_id(id));
  return result === expected_result ? true : false;
} 


let testcase = () => {
  //// check if test_data.json is connected
  // console.log(test_json_connection("abcdef"));
  // console.log(test_get_a_subject_by_id(1, 'a'));
  
  // const test_string = '[{"requester_id":1,"assignee_id":1,"subject":"a"},{"requester_id":2,"assignee_id":1,"subject":"b"},{"requester_id":3,"assignee_id":1,"subject":"c"}]';
  // console.log(test_get_all_objects_by_assignee_id(1,test_string));
  // console.log(test_get_all_requester_ids([1,2,3,4,5,6]));
};

testcase();
