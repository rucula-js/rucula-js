import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DocsService } from '../docs.service';
@Component({
  selector: 'docs-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{

  constructor(private routeActive:ActivatedRoute,private doc:DocsService, private router:Router){}

  Body!:string;
  Title!:string;

  ngOnInit(){
      this.GetContent(this.routeActive.snapshot.params["page"])
      let li =  document.querySelectorAll(".links-contents ol li a")!;

    li.forEach(item => {
      item.addEventListener("click",(e) => {
        let link = (e.target as HTMLLinkElement).href;
      }) 
    })
    }

  GetContent(param:string){
   this.doc.GetDocumento(param)
    .subscribe((documento) => {
      this.Body = documento["Body" as any]
      this.Title = documento["Title" as any]
      this.PreparaConteudo()
      this.SetToc()
   })
  }
  PreparaConteudo(){
    document.getElementById("content")!.outerHTML =  this.Body;
    document.querySelector("title")!.textContent =  this.Title;
  }

  SetToc(){
    SetIdForTitle()
    AddResume()
    function SetIdForTitle(){
        let ms;
        document.querySelectorAll("main h1").forEach(item => {
            item.id = ms = Date.now().toString(); 
        })
    }
    function AddResume(){
      document.querySelectorAll("main h1").forEach(item => {
        const li:HTMLLIElement = document.createElement("li")

        const anchor = document.createElement("a")

        anchor.setAttribute("href",`#${item.id}`)
        anchor.textContent = `${item.textContent}`
        li.appendChild(anchor)

        document.getElementById("resume")?.appendChild(li) 
        
    })
    }
  }
}
