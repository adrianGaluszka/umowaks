import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import jsPDF from "jspdf";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class DocumentService {

  documentUrl: any;

  private _formData: any;
  private formValues: BehaviorSubject<{seller: null, vehicleInformation: null}> = new BehaviorSubject({seller: null, vehicleInformation: null})
  private noInputSectionsLineSpace: number = 4;
  private withInputSectionsLineSpace: number = 7;
  private tooltipSpace: number = 1;
  private tooltipFontSize: number = 8;
  private fontSize: number = 11;
  private marginLeft: number = 16;
  constructor(){}

  setFormData(updatedData: any) {
    this._formData = updatedData;
    this.formValues.next(updatedData)
  }

  getFormData(): FormGroup {
    return this._formData;
  }

  getFormValues(): Observable<any> {
   return this.formValues.asObservable();
  }

  getDocumentUrl(): string {
    if(!this.documentUrl) {
      return '';
    }
    return this.documentUrl;
    // return URL.createObjectURL(this.documentUrl);
  }

  generateDocument() {
    console.log('GENERATE');

    const doc = new jsPDF()
    const width = doc.internal.pageSize.getWidth()
    const currentyear = new Date().getFullYear();

    doc.addFont('../assets/fonts/Roboto-Light.ttf', 'Roboto', 'light');
    doc.addFont("../assets/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("../assets/fonts/Roboto-Bold.ttf", "Roboto", "bold");
    doc.setFont("Roboto");

    doc.setLineWidth(0.1);
    doc.line(width - this.marginLeft, 20, width - this.marginLeft, 300); // vertical line
    doc.line(this.marginLeft, 20, this.marginLeft, 300); // vertical line

    doc.setFontSize(18);
    doc.text("UMOWA KUPNA-SPRZEDAŻY", width/2, this.marginLeft, {align: 'center'});

    doc.setFontSize(this.fontSize);
    doc.text(`Umowa zawarta w dniu ................... ${currentyear}r w ........................................................ o godzinie .........................`, this.marginLeft, 25);

    const sellerDataY = 35;
    doc.text('Pomiędzy:', this.marginLeft, sellerDataY);
    doc.text('Sprzedającym: .....................................................................................................................................................' , this.marginLeft, sellerDataY + this.withInputSectionsLineSpace);
    doc.text(this._formData?.seller?.name, 41, sellerDataY - 1 + this.withInputSectionsLineSpace)
    doc.setFontSize(this.tooltipFontSize);
    doc.text('(imie i nazwisko)', width/2, sellerDataY + this.withInputSectionsLineSpace + this.tooltipSpace + this.tooltipFontSize, {align: 'center'});
    doc.setFontSize(this.fontSize);

    doc.text('Ulica, miejscowość: ............................................................................................................................................', this.marginLeft, sellerDataY + this.withInputSectionsLineSpace * 2);
    doc.text(this._formData?.seller?.street + ' ' + this._formData?.seller?.city, 50, sellerDataY - 1 + this.withInputSectionsLineSpace * 2);
    doc.text('Kod pocztowy: .....................................................................................................................................................', this.marginLeft, sellerDataY + this.withInputSectionsLineSpace * 3);
    doc.text(this._formData?.seller.postCode, 42, sellerDataY - 1 + this.withInputSectionsLineSpace * 3);
    doc.text('Dokument tożsamości nr: ..................................................................................................................................', this.marginLeft, sellerDataY + this.withInputSectionsLineSpace * 4);
    doc.text(this._formData?.seller?.idCardNumber, 61, sellerDataY - 1 + this.withInputSectionsLineSpace * 4)
    doc.text('wydany przez: ......................................................................................................................................................', this.marginLeft, sellerDataY + this.withInputSectionsLineSpace * 5);
    doc.text(this._formData?.seller?.idCardReleasedBy, 41, sellerDataY - 1 + this.withInputSectionsLineSpace * 5)
    doc.text('PESEL: ........................................................................', this.marginLeft, sellerDataY + this.withInputSectionsLineSpace * 6);
    doc.text(this._formData?.seller?.pesel, 29, sellerDataY - 1 + this.withInputSectionsLineSpace * 6)
    doc.text('NIP: ...............................................................................', width/2, sellerDataY + this.withInputSectionsLineSpace * 6);
    doc.text(this._formData?.seller?.nip, width/2 + 9, sellerDataY - 1 + this.withInputSectionsLineSpace * 6)

    const buyerDataY = 87;
    doc.text('a Kupującym: .......................................................................................................................................................', this.marginLeft, buyerDataY);
    doc.setFontSize(this.tooltipFontSize);
    doc.text('(imie i nazwisko)', width/2, buyerDataY + this.withInputSectionsLineSpace + this.tooltipSpace + this.tooltipFontSize, {align: 'center'});
    doc.setFontSize(this.fontSize);

    doc.text('Ulica, miejscowość: ............................................................................................................................................', this.marginLeft, buyerDataY + this.withInputSectionsLineSpace);
    doc.text('Kod pocztowy: .....................................................................................................................................................', this.marginLeft, buyerDataY + this.withInputSectionsLineSpace * 2);
    doc.text('Dokument tozsamości nr: ..................................................................................................................................', this.marginLeft, buyerDataY + this.withInputSectionsLineSpace * 3);
    doc.text('wydany przez: ......................................................................................................................................................', this.marginLeft, buyerDataY + this.withInputSectionsLineSpace * 4);
    doc.text('PESEL: ........................................................................', this.marginLeft, buyerDataY + this.withInputSectionsLineSpace * 5);
    doc.text('NIP: ...............................................................................', width/2, buyerDataY + this.withInputSectionsLineSpace * 5);

    const vehicleDataY = 134;
    doc.setFont("Roboto", 'bold');
    doc.text('§1', width/2, vehicleDataY)
    doc.setFont("Roboto", 'normal');
    doc.text('Przedmiotem umowy jest sprzedaż pojazdu:', this.marginLeft, vehicleDataY + this.noInputSectionsLineSpace);
    doc.text('Marka/model: .............................................................', this.marginLeft, vehicleDataY + this.withInputSectionsLineSpace * 2);
    doc.text(this._formData?.vehicleInformation?.marka, 40, vehicleDataY - 1 + this.withInputSectionsLineSpace * 2);
    doc.text('Rok produkcji: ...............................................................', width/2, vehicleDataY + this.withInputSectionsLineSpace * 2);
    doc.text(this._formData?.vehicleInformation?.prodYear, width/2 + 27, vehicleDataY - 1 + this.withInputSectionsLineSpace * 2);
    doc.text('Nr silnika: ....................................................................', this.marginLeft, vehicleDataY + this.withInputSectionsLineSpace * 3);
    doc.text(this._formData?.vehicleInformation?.engineNumber, 34, vehicleDataY - 1 + this.withInputSectionsLineSpace * 3);
    doc.text('Nr VIN: ...........................................................................', width/2, vehicleDataY + this.withInputSectionsLineSpace * 3);
    // doc.text(this._formData?.vehicleInformation?.vinNumber, width/2 + 20, vehicleDataY - 1 + this.withInputSectionsLineSpace * 3);
    doc.text('Nr rejestracyjny: .........................................................', this.marginLeft, vehicleDataY + this.withInputSectionsLineSpace * 4);
    doc.text(this._formData?.vehicleInformation?.nrRejestracyjny, 45, vehicleDataY - 1 + this.withInputSectionsLineSpace * 4);
    doc.text('Przebieg km: .................................................................', width/2, vehicleDataY + this.withInputSectionsLineSpace * 4);
    doc.text(this._formData?.vehicleInformation?.mileage, width/2 + 24, vehicleDataY - 1 + this.withInputSectionsLineSpace * 4)
    doc.text('Dodatkowe ustalenia: .........................................................................................................................................', this.marginLeft, vehicleDataY + this.withInputSectionsLineSpace * 5);
    doc.text(this._formData?.vehicleInformation?.additionalInformation, 54, vehicleDataY - 1 + this.withInputSectionsLineSpace * 5)

    const paragraph2Y = 174;
    doc.setFont("Roboto", 'bold');
    doc.text('§2', width/2, paragraph2Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Sprzedający oświadcza, że pojazd będący przedmiotem umowy stanowi jego własność, jest wolny od', this.marginLeft, paragraph2Y + this.noInputSectionsLineSpace);
    doc.text('wad prawnych oraz praw osśb trzecich, iż nie toczy się żadne postępowanie, którego przedmiotem jest', this.marginLeft, paragraph2Y + this.noInputSectionsLineSpace * 2);
    doc.text('ten pojazd, że nie stanowi on rowniez przedmiotu zabezpieczenia.', this.marginLeft, paragraph2Y + this.noInputSectionsLineSpace * 3);

    const paragraph3Y = 191
    doc.setFont("Roboto", 'bold');
    doc.text('§3', width/2, paragraph3Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Strony ustaliły wartość przedmiotu umowy na kwotę: .....................................................................................', this.marginLeft, paragraph3Y + this.withInputSectionsLineSpace);
    doc.text('słownie: ................................................................................................................................................................', this.marginLeft, paragraph3Y + this.withInputSectionsLineSpace * 2);

    const paragraph4Y = 210;
    doc.setFont("Roboto", 'bold');
    doc.text('§4', width/2, paragraph4Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Sprzedający przenosi na rzecz kupujacego, własność pojazdu określonego w §1 niniejszej umowy na', this.marginLeft, paragraph4Y + this.noInputSectionsLineSpace);
    doc.text('kwotę okresloną w §3 niniejszej umowy, której otrzymanie sprzedający kwituje. Kupujący kwituje', this.marginLeft, paragraph4Y + this.noInputSectionsLineSpace * 2);
    doc.text('jednocześnie odbiorem ww. pojazdu.', this.marginLeft, paragraph4Y + this.noInputSectionsLineSpace * 3);

    const paragraph5Y = 227;
    doc.setFont("Roboto", 'bold');
    doc.text('§5', width/2, paragraph5Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Kupujący oświadcza, że stan techniczny pojazdu jest mu znany.', this.marginLeft, paragraph5Y + this.noInputSectionsLineSpace);

    const paragraph6Y = 236;
    doc.setFont("Roboto", 'bold');
    doc.text('§6', width/2, paragraph6Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Strony ustaliły, że wszelkiego rodzjau koszty transakcji wynikające z realizacji ustaleń niniejszej umowy', this.marginLeft, paragraph6Y + this.noInputSectionsLineSpace);
    doc.text('oraz koszty opłaty skarkowej obciążają kupującego.', this.marginLeft, paragraph6Y + this.noInputSectionsLineSpace * 2);

    const paragraph7Y = 249;
    doc.setFont("Roboto", 'bold');
    doc.text('§7', width/2, paragraph7Y);
    doc.setFont("Roboto", 'normal');
    doc.text('W sprawach nie uregulowanych w nieniejszej umowie zastosowanie mają obowiązujace w tym', this.marginLeft, paragraph7Y + this.noInputSectionsLineSpace);
    doc.text('zakresie przepisy Kodeksu Cywilnego', this.marginLeft, paragraph7Y + this.noInputSectionsLineSpace * 2);

    const paragraph8Y = 262;
    doc.setFont("Roboto", 'bold');
    doc.text('§8', width/2, paragraph8Y);
    doc.setFont("Roboto", 'normal');
    doc.text('Niniejsza umowe sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej', this.marginLeft, paragraph8Y + this.noInputSectionsLineSpace);
    doc.text('ze storn.', this.marginLeft, paragraph8Y + this.noInputSectionsLineSpace * 2);

    doc.text('...........................................', width/4, 285, {align: 'center'});
    doc.text('...........................................', (width/4) * 3, 285, {align: 'center'});
    doc.text('Kupujący', width/4, 289, {align: 'center'})
    doc.text('Sprzedający', (width/4) * 3, 289, {align: 'center'});

    // doc.output('dataurlnewwindow')
    const blobPDF = new Blob([doc.output('blob')], {type: 'application/pdf'});
    this.documentUrl = URL.createObjectURL(blobPDF);
    // console.log(doc.output('datauri'));
    // console.log(doc.output('bloburl'));
    // console.log(this.documentUrl);

  }
}
