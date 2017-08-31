class Rfa::RelationBetweenApplicant < CalsBase
  include Concerns::Rfa::ApplicantsRelationApiProtocolProvider

  attr_accessor :relationship_type, :date_of_relationship, :place_of_relationship_city, :place_of_relationship_state, :other_relationship

  def self.parent_path
    'rfa-1a-forms'
  end

  def self.api_resource_path
    'applicants-relationship'
  end
end
