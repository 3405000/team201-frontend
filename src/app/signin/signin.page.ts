import { Component, OnInit } from '@angular/core'
import { SignInDTO } from '../shared/model/auth/singin.interface'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  standalone: false
})
export class SigninPage implements OnInit {
  // 로그인 상태면 (token 보유 시) 자동으로 home으로 이동
  ngOnInit() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      this.router.navigate(['/home'])
    }
  }

  form: SignInDTO = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.signIn(this.form).subscribe({
      // 로그인 성공 시 home으로 이동
      next: (response) => {
        console.log(response)
        alert('로그인 성공')
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error('로그인 오류', err)
        alert('로그인 실패')
      }
    })
  }

  goRegisterPage() {
    console.log('go register page')
    this.router.navigate(['/register'])
  }
}
