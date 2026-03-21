from fpdf import FPDF
import os

def generate_company_profile(output_path):
    """Generate a branded company profile PDF."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=25)
    
    # ── Page 1: Cover ──
    pdf.add_page()
    
    # Navy header bar
    pdf.set_fill_color(11, 60, 93)
    pdf.rect(0, 0, 210, 80, 'F')
    
    # Company name
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 28)
    pdf.set_y(20)
    pdf.cell(0, 12, 'GLOBALAGRI', ln=True, align='C')
    pdf.set_font('Helvetica', '', 18)
    pdf.cell(0, 10, 'COMMODITIES', ln=True, align='C')
    
    # Tagline
    pdf.set_font('Helvetica', 'I', 12)
    pdf.set_y(52)
    pdf.cell(0, 8, 'Connecting harvests to markets, reliably and responsibly', ln=True, align='C')
    
    # Gold accent line
    pdf.set_draw_color(217, 164, 65)
    pdf.set_line_width(1)
    pdf.line(60, 68, 150, 68)
    
    # Company Profile title
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 22)
    pdf.set_y(95)
    pdf.cell(0, 12, 'Company Profile', ln=True, align='C')
    
    # One-line pitch
    pdf.set_font('Helvetica', '', 11)
    pdf.set_text_color(80, 80, 80)
    pdf.set_y(115)
    pdf.set_x(25)
    pdf.multi_cell(160, 6, 'An international agricultural commodities trading company specializing in grains, feedstuff, pulses, oilseeds, rice, sugar, and coffee, serving industrial buyers, traders, and food manufacturers worldwide.', align='C')
    
    # Key Products section
    pdf.set_y(150)
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 14)
    pdf.cell(0, 10, 'Our Core Commodities', ln=True, align='C')
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(60, 60, 60)
    
    commodities = [
        ('Grains', 'Wheat, corn, barley for food and feed applications'),
        ('Feedstuff', 'Protein-rich feed ingredients for livestock and aquaculture'),
        ('Pulses', 'Beans, lentils, chickpeas, and peas from key origins'),
        ('Oilseeds', 'Soybeans, sunflower seeds, rapeseed, and related products'),
        ('Rice', 'Long-grain, medium-grain, and specialty varieties'),
        ('Sugar', 'Raw and refined sugar for industrial users'),
        ('Coffee', 'Green coffee from major producing regions'),
    ]
    
    pdf.set_y(165)
    for name, desc in commodities:
        pdf.set_x(30)
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(11, 60, 93)
        pdf.cell(30, 6, name + ':  ', ln=False)
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(60, 60, 60)
        pdf.cell(0, 6, desc, ln=True)
    
    # Footer bar
    pdf.set_fill_color(11, 60, 93)
    pdf.rect(0, 275, 210, 22, 'F')
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_y(280)
    pdf.cell(0, 5, 'info@globalagri.com  |  www.globalagri.com  |  Geneva  |  Dubai  |  Singapore  |  Nairobi', ln=True, align='C')
    
    # ── Page 2: Details ──
    pdf.add_page()
    
    # About section
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 16)
    pdf.cell(0, 10, 'About GlobalAgri Commodities', ln=True)
    
    # Gold line
    pdf.set_draw_color(217, 164, 65)
    pdf.set_line_width(0.5)
    pdf.line(10, pdf.get_y() + 2, 80, pdf.get_y() + 2)
    pdf.ln(8)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 5.5, 'GlobalAgri Commodities is an international trading company focused on agricultural raw materials. We connect producers, exporters, and industrial buyers through disciplined risk management, robust logistics, and transparent communication.\n\nOur team brings deep experience across grains, feedstuff, pulses, oilseeds, rice, sugar, and coffee markets, serving clients across Europe, the Middle East, Asia, and Africa.')
    
    pdf.ln(8)
    
    # What sets us apart
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 14)
    pdf.cell(0, 10, 'What Sets Us Apart', ln=True)
    pdf.set_draw_color(217, 164, 65)
    pdf.line(10, pdf.get_y() + 2, 65, pdf.get_y() + 2)
    pdf.ln(8)
    
    pillars = [
        ('Reliability', 'Long-term relationships with producers, exporters, and logistics partners ensure consistent supply and execution.'),
        ('Risk Management', 'Structured contracts, hedging strategies, and disciplined execution to protect both sides of the trade.'),
        ('Compliance & Integrity', 'Aligned with international standards on quality, documentation, and sanctions compliance.'),
    ]
    
    for title, desc in pillars:
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(11, 60, 93)
        pdf.cell(0, 6, title, ln=True)
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(60, 60, 60)
        pdf.multi_cell(0, 5, desc)
        pdf.ln(3)
    
    pdf.ln(5)
    
    # Global Presence
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 14)
    pdf.cell(0, 10, 'Global Presence', ln=True)
    pdf.set_draw_color(217, 164, 65)
    pdf.line(10, pdf.get_y() + 2, 55, pdf.get_y() + 2)
    pdf.ln(8)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 5.5, 'Our network spans key origination and destination markets across multiple continents:\n\n- Geneva, Switzerland (European HQ & Trading)\n- Dubai, UAE (Middle East & Africa)\n- Singapore (Asia-Pacific)\n- Nairobi, Kenya (East Africa)\n- Sao Paulo, Brazil (South America origination)\n- Kyiv, Ukraine (Black Sea origination)')
    
    # Contact section
    pdf.ln(8)
    pdf.set_text_color(11, 60, 93)
    pdf.set_font('Helvetica', 'B', 14)
    pdf.cell(0, 10, 'Contact Us', ln=True)
    pdf.set_draw_color(217, 164, 65)
    pdf.line(10, pdf.get_y() + 2, 45, pdf.get_y() + 2)
    pdf.ln(8)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 6, 'Email: info@globalagri.com', ln=True)
    pdf.cell(0, 6, 'Phone: +41 22 000 0000', ln=True)
    pdf.cell(0, 6, 'Web: www.globalagri.com', ln=True)
    
    # Footer bar
    pdf.set_fill_color(11, 60, 93)
    pdf.rect(0, 275, 210, 22, 'F')
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_y(280)
    pdf.cell(0, 5, 'GlobalAgri Commodities  |  Company Profile 2025  |  Confidential', ln=True, align='C')
    
    pdf.output(output_path)
    print(f"Generated company profile PDF at {output_path}")
