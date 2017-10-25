class Rfa::PacketController < CalsBaseController

def index
  @application_id = params[:a01_id]
  @rfa_01a_application = rfa_application_packet_helper.rfa_01a_application(@application_id)
  @rfa_01b_forms = rfa_application_packet_helper.rfa_01b_forms(@application_id)
end

  def rfa_application_packet_helper
    Helpers::Rfa::ApplicationPacketHelper.new(auth_header: get_session_token)
  end

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: get_session_token)
  end

end
