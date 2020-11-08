import React, { Component } from "react";

class CreateSession extends Component {
  render() {
    return (
      <div className="new-session">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <h1>New session</h1>
            </div>

            <div className="col-md-12">
              <form>
                <div className="form-group row">
                  <label htmlFor="session-name" className="col-sm-2 col-form-label">Session name</label>

                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="session-name"
                      v-model="formData.name"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputGroupFile01" className="col-sm-2 col-form-label">Images</label>

                  <div className="col-sm-10">
                    <div className="input-group mb-3">
                      {/* <file-preview
                          :imageFiles.sync="formData.imageFiles"
                          className="mt-5"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-2">Checkbox</div>
                  <div className="col-sm-10">

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck1"
                      />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Example checkbox
                                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      onClick={this.submit}
                    >Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }

  submit() {
    console.log("Submitting");
  }
};

export default CreateSession;
