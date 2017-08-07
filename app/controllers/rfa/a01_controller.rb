class Rfa::A01Controller < CalsBaseController

  def show
  end

  def create
    # make api call to create application
    rfa_app_response = rfa_application_helper.create_application
    #TODO: some method here to return our application object more betterly
    rfa_application = Rfa::Application.new(rfa_app_response['id'])
    redirect_to  edit_rfa_a01_path(rfa_application.id)
  end

  def edit
    # @all dictionaries
    @name_types = rfa_application_helper.name_types
    @phone_types = rfa_application_helper.phone_types
    @gender_types = rfa_applicant_helper.gender_types
    @education_levels = rfa_applicant_helper.education_levels
    @language_types =  rfa_applicant_helper.language_types
    @state_types = rfa_applicant_helper.state_types
    @salary_types = rfa_applicant_helper.salary_types

    @residence_types =  dictionaries_helper.residence_ownership_types
    @ethnicity_types = dictionaries_helper.ethnicity_types
    # @race_types = dictionaries_helper.race_types
    @address_types = dictionaries_helper.address_types
    @relationship_to_applicant_types = dictionaries_helper.relationship_to_applicant_types
    @relationship_types = dictionaries_helper.relationship_types
    @license_types = dictionaries_helper.license_types
    @relationship_to_applicant_types = dictionaries_helper.relationship_to_applicant_types
    @application = rfa_application_helper.find_by_id(params[:id])
    # @application.applicants = rfa_application_helper.find_applicants()
    @application.applicants = rfa_applicant_helper.find_by_application_id(params[:id])
    @application.residence = rfa_residence_helper.find_by_application_id(params[:id])
    @application.adoption_history = rfa_adoption_history_helper.find_by_application_id(params[:id])
    @application.minor_children = rfa_minor_children_helper.find_by_application_id(params[:id])
  end

  def update
    applicants = params['applicants']
    residence = params['residence']
    minor_children = params['minorChildren']
    other_adults = params['otherAdults']
    adoption_history= params['fosterCareHistory']
    application_response = {}

    if applicants.present?
      applicants_result = []
      applicants.each do |applicant|
        applicant = applicant.permit!
        applicants_result << rfa_applicant_helper.create(params[:id], applicant.to_json)
      end
      application_response[:applicants] = applicants_result
    end

    if residence.present?
      residence = residence.permit!
      rfa_residence_helper.create(params[:id], residence.except('home_languages').to_json)
    end

    if minor_children.present?
      minor_children_result = []
      minor_children.each do |child|
        child = child.permit!
        minor_children_result << rfa_minor_children_helper.create(params[:id], child.except('child_related_to').to_json)
      end
      application_response[:minor_children] = minor_children_result
    end

    if other_adults.present?
      other_adults_result = []
      other_adults.each do |adult|
        adult = adult.permit!
        other_adults_result << rfa_other_adults_helper.create(params[:id], adult.except('relationship_types', 'index','relationship_to_applicants').to_json)
      end
      application_response[:other_adults] = other_adults_result
    end

    if adoption_history.present?
      adoption_history.permit!
      adoption_history_results = rfa_adoption_history_helper.create(params[:id], adoption_history.to_json)
      application_response[:adoption_history] = adoption_history_results
    end

    render action: 'edit.html.erb'
  end

  private

  def rfa_application_helper
    Helpers::Rfa::ApplicationHelper.new(auth_header: session['token'])
  end

  def rfa_applicant_helper
    Helpers::Rfa::ApplicantHelper.new(auth_header: session['token'])
  end

  def rfa_residence_helper
    Helpers::Rfa::ApplicationResidenceHelper.new(auth_header: session['token'])
  end

  def rfa_adoption_history_helper
    Helpers::Rfa::AdoptionHistoryHelper.new(auth_header: session['token'])
  end

  def rfa_minor_children_helper
    Helpers::Rfa::ApplicationMinorChildrenHelper.new(auth_header: session['token'])
  end

  def rfa_other_adults_helper
    Helpers::Rfa::ApplicationOtherAdultsHelper.new(auth_header: session['token'])
  end

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: session['token'])
  end

end
