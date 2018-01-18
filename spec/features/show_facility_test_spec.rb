require 'rails_helper'
require 'vcr'

RSpec.feature 'Facilities', js: true, set_auth_header: true  do
  scenario 'List of facilities from search results' do
    facilities_list
  end

  scenario 'click facility from list of facilities search results' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Lederhouse Transitions')
  end

  scenario 'refresh facility' do
    facilities_list
    click_link('Lederhouse Transitions')
    page.evaluate_script('window.location.reload()')
    expect(page).to have_text('Lederhouse Transitions')
  end

  scenario 'click into facility and show complaints' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Approved')
  end

  scenario 'click into facility and show children' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Takahashi')
  end

  scenario 'select county dropdown and show search results' do
    visit search_index_path
    find(:select, 'county_select').first(:option, 'Alameda').select_option
    find_button('search').click
    expect(page).to have_text('West, Connie & Anthony CFH')
  end

  scenario 'select facility type dropdown and show search results' do
    visit search_index_path
    select "Orange", :from => "county_select"
    find(:select, 'facility_select').first(:option, 'Adoption Agency').select_option
    find_button('search').click
    expect(page).to have_text('Open Door Adoption')
  end

  scenario 'find facilties by entering facility ID' do
    visit search_index_path
    fill_in 'Enter Facility ID #', with: '198798943'
    find_button('search').click
    expect(page).to have_text('Altadena Youth Shelter')
  end

  scenario 'find facilties by entering facility ID with alpha charecters' do
    visit search_index_path
    fill_in 'Enter Facility ID #', with: 'DL7oFNL0AB'
    find_button('search').click
    expect(page).to have_text('Sandy Beach Foster Care Home')
  end

  def facilities_list
    visit search_index_path
    fill_in 'Enter Facility Name', with: 'Lederhouse Transitions'
    find_button('search').click
    expect(page).to have_text('Lederhouse Transitions')
  end
end
