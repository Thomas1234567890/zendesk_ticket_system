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

/// When a user selects a group id (assignee_id: 5), return all subjects with the assigned group id
let get_all_objects_by_assignee_id = (id : number) =>
{
  let result = data.filter( (ele) => ele.assignee_id === id );
  console.log(result)
  return result;
}

/*

let get_a_subject_by_group_id = (id, json_arr) => {
  for (i = 0; i < json_arr.tickets.length; i++) {
    if (json_arr.tickets[i].assignee_id == id) {
      return json_arr.tickets[i].subject;
    }
  }
  return false;
};


 */

//// solution

//// test

//// get all the subjects as a string and compare them to the expected value
//// json_test_data comes from local import
let test_json_connection = (expected_result) => {
  const result = data.map(x => x.subject).join("");
  return result === expected_result ? true : false;
}
 
let test_get_a_subject_by_id = (id : number, expected_result: string) => 
{
  const result = get_a_subject_by_id(id);
  return result === expected_result ? true : false;
}

let test_get_all_objects_by_assignee_id = (id :number, expected_result: string) => 
{
  const result = get_all_objects_by_assignee_id(id).join('');
  return result === expected_result ? true : false;
}


let testcase = () => {
  //// check if test_data.json is connected
  // console.log(test_json_connection("abcdef"));
  // console.log(test_get_a_subject_by_id(1, 'a'));
  console.log(test_get_all_objects_by_assignee_id(1,'abc',))
};

testcase();
