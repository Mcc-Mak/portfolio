import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarHtml from "./components/navbar";
// import Flexbox from "flexbox-react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

//
// i.e.
//
// componentDidMount() {}
// componentDidUpdate() {}
// render() {}

const CONSTANT = {
  DOC_TITLE: "[DEMO] IT | Professional Certificate Practice",
};
const cache = (action, name, i_data) => {
  switch (action) {
    case "U":
      // >>> Update
      // CERTIFICATE_SUMMARY: state.prefilledAnswer,
      // QUESTION_ALL: state.questionAll,
      return fetch(
        `http://192.168.68.106:5000/setLocalStorage?name=${name}&value=${btoa(
          JSON.stringify(i_data)
        )}`
      );
    case "R":
      // >>> Query
      return fetch(`http://192.168.68.106:5000/getLocalStorage?name=${name}`);
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error));
  }
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    // cache("R", "CERTIFICATE_SUMMARY")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    this.state = {
      questionAll: [], // 0-indexed
      questionNo: 1,
      mcIndustry: "mc4it",
      questionNoMax: -1,
      questionIdAndNoMap: -1, // 0-indexed
      prefilledAnswer: [], // 0-indexed
    };
  }
  getData() {
    fetch(`http://192.168.68.106:5000/${this.state.mcIndustry}/all`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ questionNoMax: json.data.length });
        return json;
      })
      .then((json) => {
        this.setState({ questionAll: json.data });
        return json;
      })
      .then((json) => {
        this.setState({
          questionIdAndNoMap: Object.fromEntries(
            json.data.map((v, k) => [k, v.question_id])
          ),
        });
        return json;
      })
      .then((json) => {
        this.setState({
          prefilledAnswer: Object.fromEntries(
            Array.from(Array(100).keys()).map((v, k) => [k, null])
          ),
        });
        // console.log(json)
        // alert(JSON.stringify(json, null, 4))
        return json;
      })
      .then((json) =>
        cache("R", "STATE")
          .then((response) => response.json())
          .then((json) => {
            if (json == {})
              throw new Error(
                `Empty data! (json: ${JSON.stringify(json, null, 4)})`
              );

            this.setState({ questionNo: json.questionNo });
            return json;
          })
          .then((json) => {
            this.setState({ questionNoMax: json.questionNoMax });
            return json;
          })
          .then((json) => {
            this.setState({ questionAll: json.questionAll });
            return json;
          })
          .then((json) => {
            this.setState({
              questionIdAndNoMap: json.questionIdAndNoMap,
            });
            return json;
          })
          .then((json) => {
            this.setState({
              prefilledAnswer: json.prefilledAnswer,
            });
            return json;
          })
          .then((e) => {
            // console.log(this.state)
            this.preselectOption(this.state);
          })
          .catch((error) => console.log(error))
      );
  }
  restoreButtonLayout() {
    document.querySelectorAll(`[class*="question-select_"]`).forEach((e) => {
      e.classList.remove("btn-danger");
      e.classList.remove("btn-success");
      e.classList.add("btn-outline-secondary");
    });
  }
  updateLayout(state) {
    let question = this.getQuestion(state);
    ["A", "B", "C", "D"].forEach((answer) => {
      document.querySelector(`.question-select_${answer}`).innerText =
        question[`answer_${answer}_desc`];
    });
    document.querySelector(
      `.question-description`
    ).innerHTML = `<b>${question.question_id}. ${question.question_desc}</b>`;
    this.updatePagination(state);
  }

  updatePagination(state) {
    document.querySelector(".btn-question_next").disabled =
      state.questionNo == state.questionNoMax;
    document.querySelector(".btn-question_back").disabled =
      state.questionNo == 1;
  }

  preselectOption(state) {
    let preselectOption = state.prefilledAnswer[state.questionNo - 1];
    let preselectedElement = document.querySelector(
      `.question-select_${preselectOption}`
    );
    // if (preselectedElement) preselectedElement.click();

    if (preselectedElement) {
      let valueClicked = preselectOption;
      let valueExpected =
        this.state.questionAll[this.state.questionNo - 1].expected_answer_id;
      this.state.prefilledAnswer[this.state.questionNo - 1] = valueClicked;
      this.restoreButtonLayout();
      if (valueClicked != valueExpected) {
        preselectedElement.classList.remove("btn-outline-secondary");
        preselectedElement.classList.add("btn-danger");
      }
      let expectedElemenet = document.querySelector(
        `.question-select_${valueExpected}`
      );
      expectedElemenet.classList.remove("btn-outline-secondary");
      expectedElemenet.classList.add("btn-success");
    }
  }
  getQuestion(state) {
    let idAndNoMap = Object.entries(state.questionIdAndNoMap).find(
      (e, i) => parseInt(e[0]) == parseInt(state.questionNo - 1)
    );
    let e_question_id = idAndNoMap ? idAndNoMap[1] : {};
    let question = state.questionAll.find(
      (quest) => parseInt(quest.question_id) == parseInt(e_question_id)
    );
    return question;
  }
  resetState() {
    return fetch(`http://192.168.68.106:5000/${this.state.mcIndustry}/all`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ questionNo: 1 });
        return json;
      })
      .then((json) => {
        this.setState({ questionNoMax: json.data.length });
        return json;
      })
      .then((json) => {
        this.setState({ questionAll: json.data });
        return json;
      })
      .then((json) => {
        this.setState({
          questionIdAndNoMap: Object.fromEntries(
            json.data.map((v, k) => [k, v.question_id])
          ),
        });
        return json;
      })
      .then((json) => {
        this.setState({
          prefilledAnswer: Object.fromEntries(
            Array.from(Array(100).keys()).map((v, k) => [k, null])
          ),
        });
        return json;
      });
  }

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    document.title = CONSTANT.DOC_TITLE;

    this.updatePagination(this.state);
  }

  render() {
    let question = this.getQuestion(this.state);
    return (
      <div class="d-flex flex-column w-75">
        <div
          class="alert alert-primary question-description pl-6 pr-6 border border-warning"
          style={{ fontSize: 20, float: "left", width: "75%" }}
        >
          <b>
            {question?.question_id}. {question?.question_desc}
          </b>
        </div>
        <div class="question-option_container p-4">
          {["A", "B", "C", "D"].map((answer) => {
            return (
              <div class="row mb-3 question-option">
                <label class="col-sm-1 col-form-label alert alert-info">
                  {answer}:
                </label>
                <div style={{ width: 10 }}></div>
                <button
                  class={`btn btn-outline-secondary question-select_${answer} w-50`}
                  value={answer}
                  onClick={(e) => {
                    let valueClicked = e.target.value;
                    let valueExpected =
                      this.state.questionAll[this.state.questionNo - 1]
                        .expected_answer_id;

                    this.state.prefilledAnswer[this.state.questionNo - 1] =
                      valueClicked;

                    this.setState(
                      {
                        prefilledAnswer: this.state.prefilledAnswer,
                      },
                      () => {
                        cache("U", "STATE", this.state)
                          .then((response) => response.json())
                          .then((data) => console.log(data));
                        // console.log({
                        //   valueExpected: valueExpected,
                        //   valueClicked: valueClicked,
                        // });
                        // console.log(this.state.prefilledAnswer);
                        this.restoreButtonLayout();
                        if (valueClicked != valueExpected) {
                          e.target.classList.remove("btn-outline-secondary");
                          e.target.classList.add("btn-danger");
                        }
                        let expectedElemenet = document.querySelector(
                          `.question-select_${valueExpected}`
                        );
                        expectedElemenet.classList.remove(
                          "btn-outline-secondary"
                        );
                        expectedElemenet.classList.add("btn-success");
                      }
                    );
                  }}
                >
                  {question ? question[`answer_${answer}_desc`] : null}
                </button>
              </div>
            );
          })}
          <div class="d-flex flex-row pt-3">
            <div style={{ width: 100 }}>
              <button
                class="btn btn-outline-primary btn-question_back"
                onClick={() => {
                  this.state.questionNo -= this.state.questionNo > 1 ? 1 : 0;
                  // console.log(
                  //   `[handleOnClickBack] questionNo: ${this.state.questionNo}`
                  // );
                  this.restoreButtonLayout();
                  this.updateLayout(this.state);
                  this.preselectOption(this.state);
                }}
              >
                Back
              </button>
            </div>
            <div style={{ width: 600 }}>
              <button
                class="btn btn-success btn-question_next"
                onClick={() => {
                  this.state.questionNo +=
                    this.state.questionNo < this.state.questionNoMax ? 1 : 0;
                  // console.log(
                  //   `[handleOnClickNext] questionNo: ${this.state.questionNo}`
                  // );
                  this.restoreButtonLayout();
                  this.updateLayout(this.state);
                  this.preselectOption(this.state);
                }}
              >
                Next
              </button>
            </div>
            <div>
              <button
                class="btn btn-warning btn-question_redo"
                onClick={() => {
                  this.resetState(this.state).then((e) => {
                    cache("U", "STATE", this.state);
                    this.restoreButtonLayout();
                    this.updateLayout(this.state);
                  });
                }}
              >
                Redo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CompletionProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CERTIFICATE_SUMMARY: null,
      QUESTION_ALL: null,
      STATE: null,
      STATE_M: null,
    };
  }

  componentDidMount() {
    cache("R", "STATE")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          PREV_STATE: data,
        })
      )
      .then((r) =>
        this.setState({
          CERTIFICATE_SUMMARY: this.state.PREV_STATE.prefilledAnswer,
        })
      )
      .then((r) =>
        this.setState({
          QUESTION_ALL: this.state.PREV_STATE.questionAll,
        })
      )
      .then((res) => {
        console.log(this.state.CERTIFICATE_SUMMARY);
        console.log(this.state.QUESTION_ALL);
      })
      .catch((error) => console.log(error));
  }
  componentDidUpdate() {
    cache("U", "STATE", this.state.PREV_STATE);
    // console.log(this.state);
    // console.log(this.state.CERTIFICATE_SUMMARY);
    // console.log(this.state.QUESTION_ALL);
    // console.log(this.state.PREV_STATE);
  }

  render() {
    if (!this.state.CERTIFICATE_SUMMARY) return;
    if (!this.state.QUESTION_ALL) return;

    console.log(this.state.CERTIFICATE_SUMMARY);

    return (
      <div class="d-flex justify-content-center m-3">
        <div
          class="d-flex align-content-start flex-wrap"
          style={{ width: "80%" }}
        >
          {Object.keys(this.state.CERTIFICATE_SUMMARY)
            .filter((e) => e < this.state.PREV_STATE.questionNoMax)
            .map((e) => {
              e = parseInt(e);
              return (
                <button
                  class={`btn ${
                    this.state.CERTIFICATE_SUMMARY[e]
                      ? this.state.QUESTION_ALL[e].expected_answer_id ==
                        this.state.CERTIFICATE_SUMMARY[e]
                        ? "btn-success"
                        : "btn-danger"
                      : "btn-outline-secondary"
                  } m-2`}
                  style={{ width: 100, height: 100 }}
                  value={e}
                  onClick={() => {
                    let temp = JSON.parse(
                      JSON.stringify(this.state.PREV_STATE)
                    );
                    temp.questionNo = e + 1;
                    this.setState(
                      {
                        STATE_M: temp,
                      },
                      () => {
                        cache("U", "STATE", this.state.STATE_M).then(
                          (response) => window.location.replace("/")
                        );
                      }
                    );
                  }}
                >
                  {e + 1} ({this.state.CERTIFICATE_SUMMARY[e] ?? "n.a."})
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

const App = () => {
  return (
    <div>
      <NavbarHtml />
      <Routes>
        <Route path="/" element={<Question />} />
        <Route exact path="/progress" element={<CompletionProgress />} />
      </Routes>
    </div>
  );
};

export default App;
