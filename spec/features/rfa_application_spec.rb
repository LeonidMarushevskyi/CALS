require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA', js: true do

  scenario 'Dashboard page', set_auth_header: true do
    visit root_path
    expect(page).to have_button('Create RFA Application (Form 01)')
  end

  scenario 'validate applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
  end

  scenario 'validate full applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    fill_in 'applicants[0].driver_license_number', with: 'ABC123'
    expect(page).to have_content 'More about Applicant'
    find(:select, 'highest_education_level').first(:option, 'Some High School').select_option
    find(:select, 'ethnicity').first(:option, 'Black').select_option
    find(:select, 'applicants[0].driver_license_state').first(:option, 'Alaska').select_option
    fill_in('Email Address (optional)', with: 'test@test.com', :match => :prefer_exact)
    expect(page).to have_content 'Employment'
    fill_in('Name of the Employer', with: 'Employer Name', :match => :prefer_exact)
    fill_in('Occupation', with: 'Front End Developer', :match => :prefer_exact)
    fill_in('income', with: '10', :match => :prefer_exact)
    fill_in('street_address', with: '2870 Gateway', :match => :prefer_exact)
    fill_in('Zip', with: '94403', :match => :prefer_exact)
    fill_in('City', with: 'Sacremento', :match => :prefer_exact)
    expect(page).to have_content 'Phone Number'
    fill_in 'applicants[0].phones[0].number', with: '201-222-2345'
    click_button('Save Progress')
    visit page.driver.current_url
    expect(find_field('highest_education_level').value).to eq '2'
    expect(find_field('ethnicity').value).to eq '4'
    expect(find_field('applicants[0].driver_license_number').value).to eq 'ABC123'
    expect(find_field('applicants[0].driver_license_state').value).to eq 'AK'
    expect(find_field('employer_name').value).to eq 'Employer Name'
    expect(find_field('occupation').value).to eq 'Front End Developer'
    expect(find_field('income').value).to eq '$10'
    expect(find_field('income_type').value).to eq '1'
    expect(find_field('applicants[0].phones[0].number').value).to eq '(201) 222-2345'
  end

  scenario 'validate Residence card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    expect(page).to have_content 'IV. Minor Children Residing in the home'
    fill_in('street_address', with: '2870 something else', :match => :prefer_exact)
    fill_in('Zip', with: '12345', :match => :prefer_exact)
    find(:select, 'mailing_similar').first(:option, 'No').select_option
    fill_in('street_address', with: 'maing address here', :match => :prefer_exact)
    fill_in('zip', with: '12345', :match => :prefer_exact)
    fill_in('city', with: 'secondary city', :match => :prefer_exact)
    #find(:select, 'Residentialstate_type').first(:option, 'Alaska').select_option
    expect(page).to have_content 'About This Residence'
    find(:select, 'residenceTypes').first(:option, 'Own').select_option
    find(:select, 'weapons').first(:option, 'Yes').select_option
    find(:select, 'body_of_water_exist').first(:option, 'Yes').select_option
    fill_in('body_of_water_description', with: 'body of water goes here', :match => :prefer_exact)
    find(:select, 'others_using_residence_as_mailing').first(:option, 'Yes').select_option
    fill_in('directions', with: 'directions goes here', :match => :prefer_exact)
    find(:select, 'languagesSpoken').first(:option, 'Arabic').select_option
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('residenceTypes').value).to eq '1'
  end

  scenario 'validate Minor Children card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click

    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    expect(page).to have_content 'IV. Minor Children Residing in the home'
    find(:select, 'relationship_to_applicant').first(:option, 'Child').select_option
    find(:select, 'child_financially_supported').first(:option, 'Yes').select_option
    find(:select, 'child_adopted').first(:option, 'Yes').select_option
    find(:select, 'minor_gender').first(:option, 'Male').select_option
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url
    expect(find_field('relationship_to_applicant').value).to eq '1'
  end

  scenario 'validate Other Adults card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    expect(page).to have_content 'V.Other adults residing or Regularly present in the home'
    find(:select, 'relationshipType').first(:option, 'Child').select_option
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('relationshipType').value).to eq '1'
  end


  scenario 'validate Foster Care card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    expect(page).to have_content 'VIII. Foster Care / Adoption / Licensure History'
    find(:select, 'q1-select-dropdown').first(:option, 'No').select_option
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('q1-select-dropdown').value).to eq 'false'
  end

  scenario 'validate references card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click

    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('firstname', with: Faker::Name.name, :match => :prefer_exact)
    fill_in('middleName', with: 'k', :match => :prefer_exact)
    fill_in('lastName', with: Faker::Name.name, :match => :prefer_exact)
    expect(page).to have_content 'IX. References'
    fill_in('firstname', with: 'Sam', :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url
  end

  scenario 'RFA page dictionaries', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click

    expect(page).to have_select('minor_gender', :with_options => ['', 'Male', 'Female'])
    expect(page).to have_select('relationshipType', :with_options => ['', 'Child', 'Sibling','Cousin', 'Niece', 'Nephew'])
    expect(page).to have_select('residenceTypes', :with_options => ['Own', 'Rent', 'Lease'])
  end
end
