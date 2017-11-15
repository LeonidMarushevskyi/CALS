class Helpers::Rfa::C01::ApplicationHelper < Helpers::ModelHelperBase
  def model_class
    Rfa::C01::Application
  end

  def find_by_id(application_id, rfa_c01_form_id)
    model_class.find_by_id(application_id, rfa_c01_form_id, auth_header)
  end
end
